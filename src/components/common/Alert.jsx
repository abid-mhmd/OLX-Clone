import { CheckCircle, XCircle } from "lucide-react";

export default function Alert({ type = "success", message, onClose }) {
  return (
    <div className="fixed !top-5 !right-5 z-50">
      <div
        className={`flex items-center justify-between !gap-4 min-w-[320px] !px-5 !py-4 rounded-lg shadow-lg text-white
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        <div className="flex items-center !gap-3">
          {type === "success" ? (
            <CheckCircle size={22} />
          ) : (
            <XCircle size={22} />
          )}

          <p>{message}</p>
        </div>

        <button onClick={onClose} className="font-bold text-lg">
          ×
        </button>
      </div>
    </div>
  );
}
