import SearchMessage from "@/ui/overview/channel/search-message";

export default function Page({ params }: { params: { id: string } }) {
  // -TODO: channel data fetching
  const id = params.id;
  return (
    <main>
      <div className="bg-gray-60 relative h-full w-full items-center justify-center p-3">
        <div className="flex h-full w-full scroll-m-0 flex-col">
          <div className="flex h-4/5 min-h-[60px] flex-row">
            <SearchMessage placeholder="Search messsage" />
          </div>
          <div className="bg-chatColor relative mt-3 flex h-full w-full grow flex-row rounded-[20px] p-6">
            <div className="flex flex-row items-center justify-center border-b-2">
              <p className="mr-4 flex-1">Channel</p>
              <p className="mr-4 flex-1">Creator</p>
              <p className="mr-4 flex-1">Users</p>
              <p className="mr-4 flex-1">Type</p>
            </div>
            {/* room info */}
            <p className="bg-userInfoColor flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              {id}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
