import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { Editor } from "@tinymce/tinymce-react";

const HeaderTutorialEdit = forwardRef(({ handleImageEditor, getData }, ref) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (getData) {
      setData(getData);
    }
  }, []);

  const childRef = useRef(null);
  useImperativeHandle(ref, () => ({
    getData: () => {
      return data;
    },
  }));

  function handleInputBasic(content, editor) {
    setData({ ...data, [editor.id]: content });
  }

  return (
    <div ref={childRef} className="w-full h-full flex flex-col items-center">
      <div className="flex-col sm:flex-row flex items-center justify-around gap-4 mb-4 bg-white w-full  p-6">
        <div className="flex flex-col gap-2 items-start ">
          <h2 className="text-2xl font-bold">Théme</h2>
          <select
            onChange={(e) => handleInputBasic(e.target.value, { id: "theme" })}
            name="theme"
            id="theme"
          >
            <option value="">Selectionnez un théme</option>
            <option value="1">Utiliser ligne Bleue</option>
            <option value="2">Utiliser mon téléphone</option>
            <option value="3">Aller sur internet</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 items-start ">
          <h2 className="text-2xl font-bold">Niveau</h2>
          <select
            onChange={(e) =>
              handleInputBasic(e.target.value, { id: "difficulty" })
            }
            name="difficulty"
            id="difficulty"
          >
            <option value="">Selectionner un niveau</option>
            <option value="Débutant">Débutant</option>
            <option value="Facile">Facile</option>
            <option value="Novice">Novice</option>
          </select>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-2xl font-bold">Hashtag</h2>
          <input
            onChange={(e) =>
              handleInputBasic(e.target.value, { id: "hashtag" })
            }
            placeholder="Vos hashtag"
            name="hashtag"
            id="hashtag"
            type="textarea"
            defaultValue={data ? data.hashtag : ""}
          />
        </div>
      </div>
      <div className="bg-white p-6 w-full grid justify-center items-center gap-4 grid-cols-4 lg:grid-cols-6 auto-rows-auto lg:grid-rows-1 border-y-2">
        <div className="col-span-1 m-auto">
          <img src="https://via.placeholder.com/150" alt="logo" />
        </div>
        <div className="col-span-3 lg:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-2xl font-bold">
              Titre
            </label>
            <input
              onChange={(e) =>
                handleInputBasic(e.target.value, { id: "title" })
              }
              placeholder="Votre titre"
              name="title"
              id="title"
              type="text"
              defaultValue={data ? data.title : ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="objective" className="text-2xl font-bold">
              Objectif
            </label>
            <input
              onChange={(e) =>
                handleInputBasic(e.target.value, { id: "objective" })
              }
              placeholder="Votre objectif"
              name="objective"
              id="objective"
              type="text"
              defaultValue={data ? data.objective : ""}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-2 col-span-4 lg:col-span-3 lg:row-auto h-full">
          <h2 className="text-2xl font-bold">Description</h2>
          <Editor
            apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
            id="description"
            onEditorChange={(e) => handleInputBasic(e, { id: "description" })}
            value={data ? data.description : ""}
            init={{
              selector: "#theEditorForTopData",
              autoresize_bottom_margin: 0,
              statusbar: false,
              placeholder: "Votre description",
              toolbar_sticky: true,
              menubar: false,
              editimage_cors_hosts: ["picsum.photos"],
              content_style:
                "body { font-family: Montserrat, Arial, sans-serif }",
              plugins: "autoresize image",
              toolbar: "bold italic underline image ",
              images_upload_handler: handleImageEditor,
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default HeaderTutorialEdit;
