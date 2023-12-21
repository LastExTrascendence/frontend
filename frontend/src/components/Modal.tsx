function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="relative min-h-fit min-w-fit items-center justify-center rounded-lg bg-stone-300 p-3">
        <div
          className="relative h-full w-full items-center justify-center rounded-lg bg-white p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
