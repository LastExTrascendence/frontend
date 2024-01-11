import Image from "next/image";

export default function GetRoleIcon(myRole, userRole) {
  console.log(">>>>>>>>>>>>>getRoleIcon", myRole, userRole);

  if (myRole === "CREATOR" && userRole === "OPERATOR") {
    return (
      <Image
        className="bg-blue-500 opacity-50 hover:opacity-100"
        src="/operator.svg"
        alt="User"
        width={18}
        height={18}
      />
    );
  }

  if (
    myRole === "CREATOR" &&
    userRole !== "CREATOR" &&
    userRole !== "OPERATOR"
  ) {
    return (
      <Image
        className="opacity-50 hover:opacity-100"
        src="/operator.svg"
        alt="Operator"
        width={18}
        height={18}
      />
    );
  }

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

// import Image from "next/image";

// export default function getRoleIcon(role: string) {
//   console.log(">>>>>>>>>>>>>getRoleIcon", role);
//   switch (role) {
//     case "CREATOR":
//       return <Image src="/creator.svg" alt="Creator" width={18} height={18} />;
//     case "OPERATOR":
//       return (
//         <Image src="/operator.svg" alt="Operator" width={18} height={18} />
//       );
//     default:
//       return <div style={{ width: "18px", height: "18px" }} />;
//   }
// }
