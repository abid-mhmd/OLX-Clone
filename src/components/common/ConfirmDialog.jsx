export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md !p-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600 !mt-3">{message}</p>
        <div className="flex justify-end !gap-3 !mt-8">
          <button onClick={onCancel} className="!px-5 !py-2 rounded border">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="!px-5 !py-2 rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
