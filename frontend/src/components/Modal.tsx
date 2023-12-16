function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-modalColor rounded p-4">
        <button type="button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
