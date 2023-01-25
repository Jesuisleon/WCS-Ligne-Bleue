import { React, useState } from "react";
import TutorialList from "@pages/AdminPanel/TutorialList";
import ThemeListBox from "@pages/AdminPanel/ThemeListBox";

function AdminPanel() {
  const [adminThemes, setAdminThemes] = useState();
  const [render, setRender] = useState(false);
  return (
    <>
      <ThemeListBox
        adminThemes={adminThemes}
        setAdminThemes={setAdminThemes}
        render={render}
        setRender={setRender}
      />
      <TutorialList adminThemes={adminThemes} render={render} />
    </>
  );
}

export default AdminPanel;
