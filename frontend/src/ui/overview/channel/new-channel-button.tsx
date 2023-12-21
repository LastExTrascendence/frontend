export default function NewChannelButton({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  return (
    <button
      type="button"
      className="h-4/5 min-h-[60px] w-48 rounded-[30px] bg-buttonColor"
      onClick={toggleModal}
    >
      NEW
    </button>
  );
}
