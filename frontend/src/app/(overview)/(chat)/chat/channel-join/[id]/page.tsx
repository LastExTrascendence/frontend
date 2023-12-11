export default function Page({ params }: { params: { id: string } }) {
  // -TODO: channel data fetching 
  const id = params.id
  return (
  <main>
     <p className="flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">{id}</p>
  </main>
  );
}