export default function ChannelInfoHeader({ name }: { name: string }) {
  return (
    <div className="font-['Noto Sans KR'] text-4xl font-normal text-white">
      #{name}
    </div>
  )
}