import i18n from "i18next";
import Image from "next/image";
import { useMenu } from "@/hooks/useMenu";

export default function TopNavLogo() {
  const { toggleSideNav, closeUserInfoCard, closeChannelInfoCard } = useMenu();

  const onClickInfo = (): void => {
    const currentLang = i18n.language;
    let newLang;

    switch (currentLang) {
      case "ko":
        newLang = "en";
        break;
      case "en":
        newLang = "fr";
        break;
      case "fr":
        newLang = "ko";
        break;
      default:
        newLang = "en";
    }

    i18n.changeLanguage(newLang);
  };


  return (
    <div
      className="relative items-center justify-center rounded-md"
      onClick={() => {
        closeUserInfoCard();
        closeChannelInfoCard();
        toggleSideNav();
      }}
    >
      <Image
        src="/LET_logo_light_purple.svg"
        alt="LET Logo"
        width={50}
        height={50}
        priority
        onClick={onClickInfo}
      />
    </div>
  );
}
