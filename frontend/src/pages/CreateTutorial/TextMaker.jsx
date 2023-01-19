import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import UploadImageEditor from "./UploadImageEditor";

const TextMaker = forwardRef(({ data, preview }, ref) => {
  const [content, setContent] = useState();

  const childRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData: () => {
      return content;
    },
    setData: () => {
      if (childRef.current) {
        childRef.current.editor.setContent(data || "");
      }
    },
  }));

  useEffect(() => {
    if (data === null) {
      setContent("");
      return;
    }
    setContent(data);
  }, [data]);

  if (preview) {
    return (
      <div
        className="p-4 bg-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <Editor
      ref={childRef}
      apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
      sameSite="None"
      value={content}
      onEditorChange={(e) => {
        setContent(e);
      }}
      init={{
        setup: (editor) => {
          editor.ui.registry.addGroupToolbarButton("alignment", {
            icon: "align-left",
            tooltip: "Alignment",
            items:
              "alignleft aligncenter alignright alignjustify || outdent indent",
          });
          editor.ui.registry.addGroupToolbarButton("list", {
            icon: "ordered-list",
            tooltip: "List",
            items: "numlist bullist",
          });
        },
        selector: "#theEditorForMainData",
        statusbar: false,
        toolbar_sticky: true,
        menubar: false,
        autoresize_bottom_margin: 0,
        image_advtab: true,
        noneditable_class: "mceNonEditable",
        contextmenu: "link",
        content_style:
          "body { font-family:roboto ,sans-serif; font-size:16px }",
        plugins:
          "autoresize searchreplace autolink save directionality visualblocks visualchars link charmap nonbreaking advlist lists wordcount help charmap emoticons",
        editimage_cors_hosts: ["picsum.photos"],
        toolbar:
          "undo redo removeformat | bold italic underline | link |fontsize | forecolor backcolor | emoticons | alignment | list |",
        images_upload_handler: UploadImageEditor,
      }}
    />
  );
});

export default TextMaker;
