import games from "@/lib/game-data.js"
import Link from "next/link";

export default function Page() {
  
  return (
    <div>
  {/* -TODO: onclick join modal */}
  {games.map(game => (
    <Link 
    className="flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    key={game.id}
    href={`/game-join/${game.id}`}
    >
      <p>Name: {game.name}</p>
      <p>Date: {game.date}</p>
      <p>Creator: {game.email} </p>
      <p>join_user: {game.join_users} </p>
      <p>status: {game.status} </p>
      <p>map: {game.map} </p>
    </Link>
  ))}

  {/* -TODO: pagenation */}
  {/* -TODO: create */}

</div>
  );
}

// import {
//   BanknotesIcon,
//   ClockIcon,
//   UserGroupIcon,
//   InboxIcon,
// } from '@heroicons/react/24/outline';
// import { lusitana } from '@/ui/fonts';
// import { fetchRoomData } from '@/lib/data';

// const iconMap = {
//   collected: BanknotesIcon,
//   customers: UserGroupIcon,
//   pending: ClockIcon,
//   invoices: InboxIcon,
// };

// export default async function CardWrapper() {
//   const {numberOfCustomers,
//     numberOfInvoices,
//     totalPaidInvoices,
//     totalPendingInvoices} = await fetchRoomData();
//   return (
//     <>
//       {/* NOTE: comment in this code when you get to this point in the course */}

//       <Card title="Collected" value={totalPaidInvoices} type="collected" />
//       <Card title="Pending" value={totalPendingInvoices} type="pending" />
//       <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
//       <Card
//         title="Total Customers"
//         value={numberOfCustomers}
//         type="customers"
//       />
//     </>
//   );
// }

// export function Card({
//   title,
//   value,
//   type,
// }: {
//   title: string;
//   value: number | string;
//   type: 'invoices' | 'customers' | 'pending' | 'collected';
// }) {
//   const Icon = iconMap[type];

//   return (
//     <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
//       <div className="flex p-4">
//         {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
//         <h3 className="ml-2 text-sm font-medium">{title}</h3>
//       </div>
//       <p
//         className={`${lusitana.className}
//           truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }
