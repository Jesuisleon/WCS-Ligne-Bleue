import React from "react";
import TutorialList from "@pages/AdminPanel/TutorialList";
import ThemeListBox from "@pages/AdminPanel/ThemeListBox";

function AdminPanel() {
  return (
    <>
      <ThemeListBox />
      <TutorialList />
    </>
  );
}

export default AdminPanel;
