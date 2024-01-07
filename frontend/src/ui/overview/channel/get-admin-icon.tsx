import Image from "next/image";

export default function getAdminIcon(role: string) {
  switch (role) {
    case "CREATOR":
      return (
        <div className="ml-auto flex bg-red-800">
          <button
            type="button"
            className="p-1"
            onClick={() => handleApiRequest("user-mute")}
          >
            <Image
              src="/user-mute.svg"
              alt="User Mute"
              width={18}
              height={18}
            />
          </button>
          <button
            type="button"
            className="p-1"
            onClick={() => handleApiRequest("user-kick")}
          >
            <Image
              src="/user-kick.svg"
              alt="User Kick"
              width={18}
              height={18}
            />
          </button>
          <button type="button" onClick={() => handleApiRequest("user-block")}>
            <Image
              src="/user-block.svg"
              alt="User Block"
              width={18}
              height={18}
            />
          </button>
        </div>
      );

    case "OPERATOR":
      return (
        <div className="ml-auto">
          <Image src="/operator.svg" alt="Operator" width={18} height={18} />
        </div>
      );

    case "USER":
    default:
      return null;
  }
}
