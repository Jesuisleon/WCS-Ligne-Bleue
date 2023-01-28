import { React, useState } from "react";
import TutorialList from "@pages/AdminPanel/TutorialList";
import ThemeListBox from "@pages/AdminPanel/ThemeListBox";
import CommentsList from "@pages/AdminPanel/CommentsList";

function AdminPanel() {
  const [adminThemes, setAdminThemes] = useState();
  const [render, setRender] = useState(false);
  const [commentTutoId, setCommentTutoId] = useState();
  const [commentTitle, setCommentTitle] = useState();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ThemeListBox
        adminThemes={adminThemes}
        setAdminThemes={setAdminThemes}
        render={render}
        setRender={setRender}
      />
      <TutorialList
        adminThemes={adminThemes}
        render={render}
        setRender={setRender}
        setCommentTutoId={setCommentTutoId}
        setCommentTitle={setCommentTitle}
        setOpen={setOpen}
      />
      {open && (
        <CommentsList
          commentTutoId={commentTutoId}
          commentTitle={commentTitle}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}

export default AdminPanel;
