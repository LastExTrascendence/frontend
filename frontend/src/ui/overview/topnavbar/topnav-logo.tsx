import Image from "next/image";
import { useMenu } from "@/hooks/useMenu";

export default function TopNavLogo() {
  const { toggleSideNav } = useMenu();

  return (
    <div
      className="relative items-center justify-center rounded-md"
      onClick={() => {
        toggleSideNav();
      }}
    >
      <Image
        src="/LET_logo_light_purple.svg"
        alt="LET Logo"
        width={50}
        height={50}
        priority
      />
    </div>
  );
}
