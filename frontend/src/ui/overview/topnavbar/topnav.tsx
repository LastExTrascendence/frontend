import Search from "@/components/search";

export default function Topnav({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full  flex-col border-b-2 border-neutral-800 bg-gray-800">
      <div className="relative h-[100px] w-full flex-shrink-0">
        <div className="absolute right-[50px] top-[20px]">
          <Search placeholder="Search User" />
        </div>
      </div>
      <div className="flex-growp-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
