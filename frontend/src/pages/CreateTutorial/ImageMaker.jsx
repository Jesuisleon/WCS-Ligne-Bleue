import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import UploadImageEditor from "./UploadImageEditor";

const TextMaker = forwardRef(({ data, previewAll }, ref) => {
  const [preview, setPreview] = useState(false);
  const [content, setContent] = useState();
  useEffect(() => {
    if (content) setPreview(true);
  }, [content]);

  const childRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData: () => {
      return content;
    },
  }));

  useEffect(() => {
    if (data) setContent(data);
  }, []);

  if (preview) {
    return (
      <div
        className={`flex w-full py-4  ${
          previewAll ? "bg-transparent" : "bg-white"
        } justify-center`}
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
        only_image_upload: true,
        setup(editor) {
          editor.on("init", function () {
            editor.execCommand("mceImage");
          });
        },
        content_style: "body { text-align: center; }",
        selector: "#image-editor",
        statusbar: false,
        toolbar_sticky: true,
        menubar: false,
        autoresize_bottom_margin: 0,
        toolbar: false,
        plugins: "autoresize image",
        editimage_cors_hosts: ["picsum.photos"],
        images_upload_handler: UploadImageEditor,
      }}
    />
  );
});

export default TextMaker;
