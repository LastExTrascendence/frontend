import Image from "next/image";

export default function GameInvite() {
  const iconColor = "var(--light-gray)";

  return (
    <Image
      src={"/tabletennis.svg"}
      width={40}
      height={40}
      alt="invite game"
      style={{ fill: iconColor }}
    />
  );
}
