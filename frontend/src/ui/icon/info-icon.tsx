import IconContainer from "@/ui/icon/icon-container";

export default function InfoIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={40}
      height={40}
      iconPath="/info.svg"
      iconColor="var(--light-gray)"
      fontColor="var(--light-gray)"
      text="Info"
      onClick={onClickInfo}
    />
  );
}
