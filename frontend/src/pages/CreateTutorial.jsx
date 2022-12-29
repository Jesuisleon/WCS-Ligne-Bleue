import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import stockedData from "./data";

function CreateTutorial() {
  const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;

  const initialData = [].concat(stockedData);

  const [editorData, setEditorData] = useState([]);

  const [anotherData, setAnotherData] = useState([]);

  useEffect(() => {
    // console.log("anotherData", anotherData);
  }, [anotherData]);

  useEffect(() => {
    setEditorData(initialData.filter(({ step }) => step));
    setAnotherData(initialData.filter(({ step }) => !step)[0]);
  }, []);

  function SubmitData(e) {
    e.preventDefault();
    stockedData.splice(0, stockedData.length, ...editorData, anotherData);
    // console.log("StockedData :", JSON.stringify(stockedData));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setAnotherData({ ...anotherData, [name]: value });
  }

  function removeBlockAndUpdateStep(blockToRemove) {
    const newStepArray = editorData.filter(
      (block) => block.step !== blockToRemove
    );
    newStepArray.forEach((block) => {
      if (block.step > blockToRemove) {
        block.step -= 1; // eslint-disable-line no-param-reassign
      }
    });
    setEditorData(newStepArray);
  }

  function addNewBlockAndUpdateStep() {
    const newStep = { step: editorData.length + 1, content: "" };
    const newStepArray = [...editorData, newStep];
    setEditorData(newStepArray);
  }

  const handleEditorChange = (content, editor) => {
    const editorBlockId = parseInt(editor.id.split(":")[1] || 0, 10);
    const updatedEditorContent = editorData.map((block) => {
      if (block.step === editorBlockId) {
        return { ...block, content };
      }
      return block;
    });
    setEditorData(updatedEditorContent);
  };

  return (
    <div className="p-4 h-full w-full flex flex-col gap-6">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        action="submit"
        onSubmit={SubmitData}
      >
        <button
          className="absolute z-30 top-[2.9em] sm:top-[6em] right-1 sm:right-4 bg-emerald-600 p-1 sm:p-3 text-white sm:font-semibold rounded sm:rounded-xl shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="submit"
        >
          Enregistrer
        </button>
        <div className="bg-gray-100 p-6 w-full grid justify-center items-center gap-4 grid-cols-4 lg:grid-cols-6 auto-rows-auto lg:grid-rows-1">
          <div className="col-span-1 m-auto">
            <img src="https://via.placeholder.com/150" alt="logo" />
          </div>
          <div className="col-span-3 lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Titre</h2>
            <input
              placeholder="Choisissez votre titre"
              className="border-2 border-gray-300 p-2 rounded"
              type="text"
              name="title"
              label="title"
              defaultValue={anotherData ? anotherData.title : ""}
              onChange={handleInputChange}
            />
            <h2 className="text-2xl font-bold">Objectif</h2>
            <input
              placeholder="Quel est l'objectif ?"
              className="border-2 border-gray-300 p-2 rounded"
              type="text"
              name="objectif"
              label="objectif"
              defaultValue={anotherData ? anotherData.description : ""}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex flex-col gap-4 col-span-4 lg:col-span-3 lg:row-auto h-full">
            <h2 className="text-2xl font-bold">Description</h2>
            <textarea
              placeholder="Laissez une description du contenu de ce tutoriel"
              className="h-full border-2 border-gray-300 p-2 rounded"
              type="text"
              name="description"
              label="description"
              defaultValue={anotherData ? anotherData.description : ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {editorData.map((block, index) => {
          return (
            <div className="bg-gray-100 w-full relative my-2" key={block.step}>
              <button
                type="button"
                className="
                cursor-pointer
                absolute
                top-2
                right-2
                bg-red-500
                text-white
                rounded-full
                w-8
                h-8
                flex
                justify-center
                items-center
                text-2xl
                font-bold
                z-10
                "
                onClick={() => removeBlockAndUpdateStep(editorData[index].step)}
              >
                X
              </button>
              <Editor
                key={block.step}
                apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
                value={editorData[index] ? editorData[index].content : ""}
                id={`theEditorArea:${block.step}`}
                onEditorChange={handleEditorChange}
                init={{
                  resize: false,
                  statusbar: false,
                  width: "100%",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                  selector: "#theEditorArea",
                  plugins:
                    "autoresize preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                  autoresize_bottom_margin: 0,
                  editimage_cors_hosts: ["picsum.photos"],
                  // menubar: 'file edit view insert format tools help',
                  menubar: false,
                  toolbar:
                    "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                  toolbar_sticky: true,
                  toolbar_sticky_offset: isSmallScreen ? 102 : 108,
                  image_advtab: true,
                  template_cdate_format:
                    "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                  template_mdate_format:
                    "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                  image_caption: true,
                  quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                  noneditable_class: "mceNonEditable",
                  toolbar_mode: "sliding",
                  contextmenu: "link image table",
                }}
              />
            </div>
          );
        })}
        <button
          type="button"
          className="m-4 w-10 h-10 rounded-full bg-black cursor-pointer text-white text-4xl font-bold sm:font-semibold shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-75"
          onClick={() => addNewBlockAndUpdateStep()}
        >+</button>
      </form>
    </div>
  );
}

export default CreateTutorial;
