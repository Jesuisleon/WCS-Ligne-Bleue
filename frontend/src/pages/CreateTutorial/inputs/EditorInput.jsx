import { Editor } from "@tinymce/tinymce-react";

export function EditorInput({
  handleImageEditor,
  handleInput,
  data,
  invalid,
  isSubmit,
}) {
  const validator = invalid && isSubmit ? "invalid" : null;
  return (
    <div className="tutorial-h-description">
      <h2 className={`text-2xl font-bold ${validator}`}>Description</h2>
      <Editor
        apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
        id="description"
        onEditorChange={handleInput}
        value={data}
        init={{
          selector: "#theEditorForTopData",
          autoresize_bottom_margin: 0,
          statusbar: false,
          placeholder: "Votre description",
          toolbar_sticky: true,
          menubar: false,
          editimage_cors_hosts: ["picsum.photos"],
          content_style: "body { font-family: Montserrat, Arial, sans-serif }",
          plugins: "autoresize image",
          toolbar: "bold italic underline image ",
          images_upload_handler: handleImageEditor,
        }}
      />
    </div>
  );
}

export default EditorInput;
