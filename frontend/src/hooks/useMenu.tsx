export const useMenu = () => {
  const closeAll = () => {
    closeSideNav();
    closeUserInfoCard();
    closeChannelInfoCard();
  };

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
    document.getElementById("background")?.classList.add("on");
    // document.getElementById("mainSectionBackground")?.classList.add("on");
  };

  const closeSideNav = () => {
    if (
      document.getElementById("sideNavWrap")?.classList.contains("on") === true
    ) {
      document.getElementById("sideNavWrap")?.classList.remove("on");
      document.getElementById("topNavLogo")?.classList.remove("on");
      document.getElementById("topNavTextLogo")?.classList.remove("on");
      document.getElementById("background")?.classList.remove("on");
      // document.getElementById("mainSectionBackground")?.classList.remove("on");
    }
  };

  const openUserInfoCard = () => {
    document.getElementById("userInfoCard")?.classList.add("on");
    document.getElementById("mainSectionBackground")?.classList.add("on");
  };

  const closeUserInfoCard = () => {
    if (
      document.getElementById("userInfoCard")?.classList.contains("on") === true
    ) {
      document.getElementById("userInfoCard")?.classList.remove("on");
      document.getElementById("mainSectionBackground")?.classList.remove("on");
    }
  };

  const openChannelInfoCard = () => {
    document.getElementById("channelInfoCard")?.classList.add("on");
    document.getElementById("mainSectionBackground")?.classList.add("on");
  };

  const closeChannelInfoCard = () => {
    if (
      document.getElementById("channelInfoCard")?.classList.contains("on") ===
      true
    ) {
      document.getElementById("channelInfoCard")?.classList.remove("on");
      document.getElementById("mainSectionBackground")?.classList.remove("on");
    }
  };

  return {
    closeAll,
    toggleSideNav,
    openSideNav,
    closeSideNav,
    openUserInfoCard,
    closeUserInfoCard,
    openChannelInfoCard,
    closeChannelInfoCard,
  };
};
