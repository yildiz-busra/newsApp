import React, {useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

function SideBar() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-full md:w-20rem lg:w-20rem"
      >
        <h4>sidebar</h4>
      </Sidebar>
      <Button
        icon="pi pi-equals"
        className="h-3rem surface-500 border-solid border-50 "
        onClick={() => setVisible(true)}
      />
    </div>
  );
}

export default SideBar;
