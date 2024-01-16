import Image from 'next/image';

export default function ButtonLeft({ width, height, onClick }: { width: number, height: number, onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      <Image
        src="/arrow_left.svg"
        alt="arrow_left"
        width={width}
        height={height}
      />
    </button>
  )
}