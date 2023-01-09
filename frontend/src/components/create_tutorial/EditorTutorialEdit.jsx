import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import handleImageEditor from "./handleImageEditor";

const EditorTutorialEdit = forwardRef(({ data, close }, ref) => {
  const childRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData: () => {
      return childRef.current.editor.getContent();
    },
  }));

  return (
    <>
      <button className="asbolute px-2 " type="button" onClick={() => close()}>
        Fermer
      </button>
      <Editor
        ref={childRef}
        apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
        sameSite="None"
        defaultValue={data}
        init={{
          selector: "#theEditorForMainData",
          statusbar: false,
          toolbar_sticky: true,
          menubar: false,
          autoresize_bottom_margin: 0,
          image_advtab: true,
          noneditable_class: "mceNonEditable",
          toolbar_mode: "wrap",
          contextmenu: "link image",
          content_style:
            "body { font-family:roboto ,sans-serif; font-size:16px }",
          plugins:
            "autoresize preview searchreplace autolink save directionality visualblocks visualchars fullscreen image link media charmap nonbreaking advlist lists wordcount help charmap emoticons",
          editimage_cors_hosts: ["picsum.photos"],
          toolbar:
            "fullscreen undo redo removeformat bold italic underline fontsize| forecolor backcolor emoticons insertfile image media link | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist |",
          setup(editor) {
            editor.ui.registry.addButton("closeButton", {
              text: "Fermer",
              icon: "cancel",
              onAction: () => {
                editor.windowManager.open({
                  title: "Fermer",
                  body: {
                    type: "panel",
                    items: [
                      {
                        type: "htmlpanel",
                        html: "Voulez-vous vraiment fermer l'éditeur ?",
                      },
                    ],
                  },
                  buttons: [
                    {
                      type: "cancel",
                      text: "Annuler",
                    },
                    {
                      type: "submit",
                      text: "Fermer",
                      primary: true,
                    },
                  ],
                  onSubmit: (api) => {
                    api.close();
                  },
                });
              },
            });
          },
          images_upload_handler: handleImageEditor,
        }}
      />
    </>
  );
});

export default EditorTutorialEdit;
