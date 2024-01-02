import { useRouter } from "next/navigation";
import IconContainer from "@/ui/icon/icon-container";
import { removeCookie } from "@/api/cookie/cookies";

export default function LogoutIcon() {
  const router = useRouter();

  const onClickLogout = (): void => {
    // if (process.env.IS_LOCAL) {
    removeCookie("access_token", {
      path: "/",
      domain: "localhost",
    });
    // }
    router.push("/login");
  };
  return (
    <IconContainer
      width={40}
      height={40}
      iconPath="/logout.svg"
      iconColor="var(--light-gray)"
      fontColor="var(--light-gray)"
      text="Logout"
      onClick={onClickLogout}
    />
  );
}
