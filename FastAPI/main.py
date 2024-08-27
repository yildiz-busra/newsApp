from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
from database import SessionLocal, engine
import models
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Retry strategy for HTTP requests
retry_strategy = Retry(
    total=5,
    status_forcelist=[429, 500, 502, 503, 504],
    allowed_methods=["HEAD", "GET", "OPTIONS"],
    backoff_factor=5,
)

adapter = HTTPAdapter(max_retries=retry_strategy)
session = requests.Session()
session.mount("https://", adapter)


def getArticleList(url):
    try:
        response = session.get(url)
        response.encoding = 'utf-8' 
        if response.status_code != 200:
            raise HTTPException(
                status_code=404, detail="Content could not be retrieved"
            )

        soup = BeautifulSoup(response.text, "html.parser")
        articles = soup.find_all("article")

        article_data = []
        for article in articles:
            link_tag = article.find("a")
            if link_tag:
                link = link_tag.get("href")
                title = link_tag.get("title")
                article = getArticle(link)
                date = getDate(link)
                description = getDescription(link)
                category = getArticleCategory(link)
                article_data.append(
                    {
                        "title": title,
                        "link": link,
                        "date": date,
                        "category": category,
                        "description": description,
                        "full_text": article,
                    }
                )

        return article_data

    except requests.RequestException as e:
        logger.error(f"Request error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching article list")
    except Exception as e:
        logger.error(f"Unexpected error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


def getCategories(url):
    try:
        url = f"{url}/tumu"
        response = session.get(url)

        if response.status_code != 200:
            raise HTTPException(
                status_code=404, detail="Content could not be retrieved"
            )

        soup = BeautifulSoup(response.text, "html.parser")
        container = soup.find("div", {"class": "pagetumu"})
        categories = container.find_all("span")

        categoryList = []
        for category in categories:
            link_tag = category.find("a")
            if link_tag:
                link = link_tag.get("href")
                title = link_tag.get("title")
                name = link_tag.text
                categoryList.append({"title": title, "link": link, "name": name})

        return categoryList

    except requests.RequestException as e:
        logger.error(f"Request error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching article list")
    except Exception as e:
        logger.error(f"Unexpected error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


def getArticle(article_url):
    try:
        if article_url.startswith("/"):
            article_url = f"https://www.haberler.com{article_url}"

        response = session.get(article_url)

        if response.status_code != 200:
            return "Full article could not be retrieved"

        soup = BeautifulSoup(response.text, "html.parser")
        article_body = soup.find("main", {"class": "haber_metni"})

        if not article_body:
            return "Full article content not found"

        paragraphs = article_body.find_all("p")
        full_text = "\n".join([para.get_text().strip() for para in paragraphs])

        return full_text

    except requests.RequestException as e:
        logger.error(f"Request error occurred while fetching article: {str(e)}")
        return "Full article could not be retrieved"
    except Exception as e:
        logger.error(f"Unexpected error occurred while fetching article: {str(e)}")
        return "Full article could not be retrieved"


def getDate(article_url):
    try:
        if article_url.startswith("/"):
            article_url = f"https://www.haberler.com{article_url}"

        response = session.get(article_url)

        if response.status_code != 200:
            return "Article could not be retrieved"

        soup = BeautifulSoup(response.text, "html.parser")
        date_tag = soup.find("div", {"class": "detay-verisi-time"})

        if not date_tag:
            return "Date not found"

        date = date_tag.get_text().strip()
        return date

    except requests.RequestException as e:
        logger.error(f"Request error occurred while fetching date: {str(e)}")
        return "Date could not be retrieved"
    except Exception as e:
        logger.error(f"Unexpected error occurred while fetching date: {str(e)}")
        return "Date could not be retrieved"


def getDescription(article_url):
    try:
        if article_url.startswith("/"):
            article_url = f"https://www.haberler.com{article_url}"

        response = session.get(article_url)

        if response.status_code != 200:
            return "Article could not be retrieved"

        soup = BeautifulSoup(response.text, "html.parser")
        description_tag = soup.find("h2", {"class": "description"})

        if not description_tag:
            return "Description not found"

        description = description_tag.get_text().strip()
        return description

    except requests.RequestException as e:
        logger.error(f"Request error occurred while fetching description: {str(e)}")
        return "Description could not be retrieved"
    except Exception as e:
        logger.error(f"Unexpected error occurred while fetching description: {str(e)}")
        return "Description could not be retrieved"


def getArticleCategory(article_url):
    try:
        if article_url.startswith("/"):
            article_url = f"https://www.haberler.com{article_url}"

        response = session.get(article_url)

        if response.status_code != 200:
            return "Article could not be retrieved"

        soup = BeautifulSoup(response.text, "html.parser")
        container = soup.find_all("span", {"class": "hbbcText"})
        articleCategory_tag = container[1].find("a")

        if not articleCategory_tag:
            return "Category not found"

        articleCategory = articleCategory_tag.text
        return articleCategory

    except requests.RequestException as e:
        logger.error(f"Request error occurred while fetching category: {str(e)}")
        return "Category could not be retrieved"
    except Exception as e:
        logger.error(f"Unexpected error occurred while fetching category: {str(e)}")
        return "Category could not be retrieved"


@app.get("/articles")
def get_articles(db: Session = Depends(get_db)):
    try:
        url = "https://www.haberler.com"
        logger.info("Fetching articles...")
        articles = getArticleList(url)
        for article in articles:
            db_article = (
                db.query(models.Article)
                .filter(models.Article.link == article["link"])
                .first()
            )

            if db_article:
                db_article.title = article["title"]
                db_article.full_text = article["full_text"]
                db_article.date = article["date"]
                db_article.description = article["description"]
                db_article.category = article["category"]
            else:
                db_article = models.Article(
                    title=article["title"],
                    link=article["link"],
                    full_text=article["full_text"],
                    date=article["date"],
                    description=article["description"],
                    category=article["category"],
                )
                db.add(db_article)

        db.commit()
        return {"articles": articles}

    except Exception as e:
        logger.error(f"An error occurred while processing articles: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@app.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    try:
        url = "https://www.haberler.com" 
        logger.info("Fetching categories...")
        categories = getCategories(url)
        return {"categories": categories}

    except Exception as e:
        logger.error(f"An error occurred while fetching categories: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
