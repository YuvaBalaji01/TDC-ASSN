
function MatchModal({
  isOpen,
  onClose,
  email,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] max-w-[95%] rounded-2xl p-6">

        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Generated Match Email
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <textarea
          value={email}
          readOnly
          rows={16}
          className="w-full border rounded-lg p-4"
        />

        <button
          onClick={onClose}
          className="w-full mt-4 bg-pink-600 text-white py-3 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default MatchModal;