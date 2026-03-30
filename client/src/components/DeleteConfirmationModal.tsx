interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({ isOpen, title = 'Confirm Deletion', message = 'Are you sure you want to delete this item? This action cannot be undone.', onCancel, onConfirm }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-2xl">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2 text-sm font-medium text-white hover:from-pink-600 hover:to-rose-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
