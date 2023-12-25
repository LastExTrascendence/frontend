import Image from "next/image";

export default function SideNavLogo() {
  const toggleSideNav = () => {
    console.log("toggleSideNav");
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
  };

  const closeSideNav = () => {
    if (
      document.getElementById("sideNavWrap")?.classList.contains("on") === true
    ) {
      document.getElementById("sideNavWrap")?.classList.remove("on");
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
        src="/LET_logo.svg"
        alt="LET Logo"
        width={60}
        height={60}
        priority
      />
    </div>
  );
}
