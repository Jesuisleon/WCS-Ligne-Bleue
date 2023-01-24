import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";

import { Editor } from "@tinymce/tinymce-react";
import UploadImageEditor from "./UploadImageEditor";

const MediaMaker = forwardRef(
  ({ type, data, setData, previewAll, close }, ref) => {
    const [content, setContent] = useState("");
    useEffect(() => {
      setData(content);
    }, [content]);

    // ref
    const childRef = useRef(null);

    useImperativeHandle(ref, () => ({
      getData: () => {
        return content;
      },
    }));

    const [preview, setPreview] = useState(false);
    useEffect(() => {
      if (preview && content === "") {
        close();
      }
    }, [preview]);

    const [dialogClose, setDialogClose] = useState(false);
    useEffect(() => {
      if (dialogClose) {
        setPreview(true);
      }
    }, [dialogClose]);

    useEffect(() => {
      if (data !== content && content !== "") {
        setContent(data);
      }
    }, [data]);

    // init data
    useEffect(() => {
      if (data) {
        setContent(data);
        setPreview(true);
      }
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

    if (type === "video") {
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
            content_style: "body { text-align: center; }",
            selector: "#image-editor",
            statusbar: false,
            toolbar_sticky: true,
            menubar: false,
            autoresize_bottom_margin: 0,
            toolbar: false,
            plugins: "autoresize media",
            media_alt_source: false,
            setup(editor) {
              editor.on("init", function f() {
                // when editor is open for the first time open the dialog
                editor.execCommand("mceMedia");
              });
            },
            init_instance_callback(editor) {
              editor.on("ExecCommand", function f() {
                // when the image dialog is closed, set the uploadSuccess to true
                setDialogClose(true);
              });
            },
          }}
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
          setup(editor) {
            editor.on("init", function f() {
              // when editor is open for the first time open the image dialog
              editor.execCommand("mceImage");
            });
          },
          init_instance_callback(editor) {
            editor.on("ExecCommand", function f() {
              // when the image dialog is closed, set the uploadSuccess to true
              setDialogClose(true);
            });
          },
        }}
      />
    );
  }
);

export default MediaMaker;
