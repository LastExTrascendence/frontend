import Image from 'next/image';
import { GameInfoProps } from '@/types/interface/game.interface';
import { useTranslation } from 'react-i18next';

export default function GameInfo({ gameInfo }: { gameInfo: GameInfoProps }) {
  const { t } = useTranslation("game");
  return (
    <div className="flex flex-col w-full min-w-[250px] rounded-[20px] bg-bgGrayColor">
      <div className="hide-on-small-height flex w-full items-center justify-center rounded-r-[20px] mt-8 mb-8">
        <Image src="/map.svg" alt="basic map" width={240} height={160} />
      </div>
      <div className="flex m-1">
        <div className="grid flex-grow place-items-center text-[1.5rem] font-normal text-white">
          {t("mode")}
        </div>
        <div className="grid flex-grow place-items-center text-[1.5rem] font-normal text-white">
          {t(gameInfo.mode)}
        </div>
      </div>
      <div className="flex m-1">
        <div className="grid flex-grow place-items-center text-[1.5rem] font-normal text-white">
          Type
        </div>
        <div className="grid flex-grow place-items-center text-[1.5rem] font-normal text-white">
          {t(gameInfo.type)}
        </div>
      </div>
    </div>
  );
}
