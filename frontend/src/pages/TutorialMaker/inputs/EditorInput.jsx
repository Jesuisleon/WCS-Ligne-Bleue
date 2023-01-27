import { Editor } from "@tinymce/tinymce-react";
import UploadImageEditor from "../UploadImageEditor";

export function EditorInput({ handleInput, data, invalid, isSubmit }) {
  return (
    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
      <h2 className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
        Description
      </h2>
      <div className="sm:col-span-2">
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
            plugins: "autoresize image",
            toolbar: "bold italic underline image ",
            images_upload_handler: UploadImageEditor,
          }}
        />
        {invalid && isSubmit ? (
          <p className="text-red-500 text-sm italic sm:mt-px sm:pt-2">
            *** Ce champ est requis ***
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default EditorInput;
