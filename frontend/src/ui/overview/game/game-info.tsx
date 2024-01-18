import Image from 'next/image'
import ButtonLeft from '@/ui/button-left'
import ButtonRight from '@/ui/button-right'

export default function GameInfo() {
  return (
    <div className="flex flex-col h-[440px] min-h-[440px] w-full min-w-[260px] rounded-[20px] bg-bgGrayColor mb-[35px]">
      <div className="flex h-[160px] w-full items-center justify-center rounded-r-[20px] mt-12 mb-12">
        <Image src="/map.svg" alt="basic map" width={240} height={160} />
      </div>
      <div className="flex m-2">
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          Mode
        </div>
        <ButtonLeft width={30} height={30} onClick={() => { console.log("click"); }} />
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          Normal
        </div>
        <ButtonRight width={30} height={30} onClick={() => { console.log("right"); }} />
      </div>
      <div className="flex p-2">
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          Type
        </div>
        <ButtonLeft width={30} height={30} onClick={() => { console.log("click"); }} />
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          Original
        </div>

        <ButtonRight width={30} height={30} onClick={() => { console.log("right"); }} />
      </div>
      <div className="flex p-2">
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          Speed
        </div>
        <ButtonLeft width={30} height={30} onClick={() => { console.log("click"); }} />
        <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
          150%
        </div>
        <ButtonRight width={30} height={30} onClick={() => { console.log("right"); }} />
      </div>
    </div>
  )
}