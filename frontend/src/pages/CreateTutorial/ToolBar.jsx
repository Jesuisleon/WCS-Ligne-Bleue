import {
  HiOutlineTrash,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi";

export function ToolBar({
  type,
  stepIndex,
  lastStepIndex,
  setPreview,
  preview,
  moveStep,
  close,
}) {
  return (
    <div className="flex justify-between mt-2 py-2 bg-slate-800 rounded-t-2xl text-white ">
      <div className="flex gap-4">
        <button className="px-2 " type="button" onClick={close}>
          <HiOutlineTrash color="red" size={20} />
        </button>
        <h1 className="uppercase font-bold">{type}</h1>
      </div>
      <div className="flex gap-4">
        {type !== "image" && (
          <button
            onClick={() => setPreview()}
            className="px-2 text-center w-20"
            type="button"
          >
            <p>{preview ? "Edit" : "Preview"}</p>
          </button>
        )}
        <div className="px-2 flex gap-2">
          <button
            disabled={stepIndex === 0}
            type="button"
            onClick={() => moveStep("up")}
          >
            <HiOutlineChevronUp
              color={stepIndex === 0 ? "gray" : "white"}
              size={20}
            />
          </button>
          <button
            disabled={stepIndex === lastStepIndex}
            type="button"
            onClick={() => moveStep("down")}
          >
            <HiOutlineChevronDown
              color={stepIndex === lastStepIndex ? "gray" : "white"}
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
