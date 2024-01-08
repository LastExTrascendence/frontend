import Image from "next/image";

export default function TopNavLogo() {
  const toggleSideNav = () => {
    if (
      document.getElementById("sideNavWrap")?.classList.contains("on") === true
    ) {
      closeSideNav();
    } else {
      openSideNav();
    }
  };

  const openSideNav = () => {
    document.getElementById("sideNavWrap")?.classList.add("on");
    document.getElementById("topNavLogo")?.classList.add("on");
    document.getElementById("topNavTextLogo")?.classList.add("on");
  };

  const closeSideNav = () => {
    if (
      document.getElementById("sideNavWrap")?.classList.contains("on") === true
    ) {
      document.getElementById("sideNavWrap")?.classList.remove("on");
      document.getElementById("topNavLogo")?.classList.remove("on");
      document.getElementById("topNavTextLogo")?.classList.remove("on");
    }
  };

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
