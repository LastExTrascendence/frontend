import i18n from "i18next";
import IconContainer from "@/ui/icon/icon-container";
import { useTranslation } from "react-i18next";

export default function InfoIcon() {
  const { t } = useTranslation();

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
    <IconContainer
      width={40}
      height={40}
      iconPath="/info.svg"
      iconColor="var(--light-gray)"
      fontColor="var(--light-gray)"
      text={t("info")}
      onClick={onClickInfo}
    />
  );
}
