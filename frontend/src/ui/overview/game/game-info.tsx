import Image from 'next/image';
import { GameInfoProps } from '@/types/interface/game.interface';
import { useTranslation } from 'react-i18next';

export default function GameInfo({ gameInfo }: { gameInfo: GameInfoProps }) {
  const { t } = useTranslation("game");
  return (
    <div className="flex flex-col h-[350px] min-h-[350px] w-full min-w-[260px] rounded-[20px] bg-bgGrayColor mb-[35px]">
      <div className="flex h-[160px] w-full items-center justify-center rounded-r-[20px] mt-8 mb-8">
        <Image src="/map.svg" alt="basic map" width={240} height={160} />
      </div>
      <div className="flex m-2 overflow-hidden">
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          {t("mode")}
        </div>
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          {t(gameInfo.mode)}
        </div>
      </div>
      <div className="flex p-2 overflow-hidden">
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          {t("type")}
        </div>
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          {t(gameInfo.type)}
        </div>
      </div>
    </div>
  )
}