import ReactDOM from "react-dom";

interface IConfirmationModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: IConfirmationModal) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="absolute w-[22rem] rounded-xl h-48 bg-gray-900 text-white shadow-lg flex flex-col justify-between px-6 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg font-semibold">{message}</h2>
        <div className="flex flex-row justify-around mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700 hover:scale-105 px-5 py-2 rounded-lg cursor-pointer duration-300 shadow-md"
          >
            Remove
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white hover:bg-gray-700 hover:scale-105 px-5 py-2 rounded-lg cursor-pointer duration-300 shadow-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,

    document.body
  );
}

export default ConfirmationModal;
