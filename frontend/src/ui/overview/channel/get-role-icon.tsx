import Image from "next/image";

export default function getRoleIcon(role: string) {
  switch (role) {
    case "CREATOR":
      return <Image src="/creator.svg" alt="Creator" width={18} height={18} />;
    case "OPERATOR":
      return (
        <Image src="/operator.svg" alt="Operator" width={18} height={18} />
      );
    default:
      return <div style={{ width: "18px", height: "18px" }} />;
  }
}
