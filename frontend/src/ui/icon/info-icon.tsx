import IconContainer from "@/ui/icon/icon-container";
import { useTranslation } from "react-i18next";

export default function InfoIcon() {
  const { t } = useTranslation();

  return (
    <IconContainer
      width={40}
      height={40}
      iconPath="/info.svg"
      iconColor="var(--light-gray)"
      fontColor="var(--light-gray)"
      text={t("info")}
    />
  );
}
