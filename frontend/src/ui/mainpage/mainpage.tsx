"use client";

import Image from "next/image";

export function mainpage() {
  return (
    <Image
      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
      src="https://cdnb.artstation.com/p/assets/images/images/036/522/689/4k/misuo-wu-alley-popup-02.jpg?1617891967"
      alt="mainpage"
      width={1024}
      height={600}
      priority
    />
  );
}

export default mainpage;
