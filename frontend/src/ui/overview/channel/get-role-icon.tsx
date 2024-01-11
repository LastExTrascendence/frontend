import Image from "next/image";

export default function GetRoleIcon({ myRole, userRole, changeRole }) {
  console.log(">>>>>>>>>>>>>getRoleIcon", myRole, userRole);

  // 관리자
  // CREATOR가 OPERATOR를 USER로 변경
  if (myRole === "CREATOR" && userRole === "OPERATOR") {
    return (
      <button type="button" onClick={changeRole}>
        <Image
          className="bg-blue-500 opacity-50 hover:opacity-100"
          src="/operator.svg"
          alt="User"
          width={18}
          height={18}
        />
      </button>
    );
  }

  // CREATOR가 USER를 OPERATOR로 변경
  if (
    myRole === "CREATOR" &&
    userRole !== "CREATOR" &&
    userRole !== "OPERATOR"
  ) {
    return (
      <button type="button" onClick={changeRole}>
        <Image
          className="opacity-50 hover:opacity-100"
          src="/operator.svg"
          alt="Operator"
          width={18}
          height={18}
        />
      </button>
    );
  }

  // 다른 역할
  switch (userRole) {
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
