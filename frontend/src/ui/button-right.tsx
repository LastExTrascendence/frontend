import Image from 'next/image';

export default function ButtonRight({ width, height, onClick }: { width: number, height: number, onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      <Image
        src="/arrow_right.svg"
        alt="arrow_right"
        width={width}
        height={height}
      />
    </button>
  )
}