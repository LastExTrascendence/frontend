import Link from "next/link";
import { LinkItemProps } from "@/lib/definitions";

const links = [
  {
    href: "/quickstart",
    title: "Quick Start",
    description: "Quickly match 1:1 games.",
  },
  {
    href: "/game",
    title: "Game",
    description: "Create or join a game room.",
  },
  {
    href: "/channel",
    title: "Channel",
    description: "Join a channel where channel is available.",
  },
  {
    href: "/profile",
    title: "Profile",
    description: "View your own profile or change settings.",
  },
];

const LinkItem = ({ href, title, description }: LinkItemProps) => (
  <Link
    href={href}
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    rel="noopener noreferrer"
  >
    <h2 className={`mb-3 text-2xl font-semibold`}>
      {title}{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{description}</p>
  </Link>
);

function LinksList() {
  return (
    <>
      {links.map((link) => (
        <LinkItem key={link.href} {...link} />
      ))}
    </>
  );
}

export default LinksList;
