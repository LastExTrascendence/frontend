"use client";

import Image from "next/image";
import Link from "next/link";

export function MainLoginButton() {
  return (
    <Link
      href={`https://api.intra.42.fr/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`}
    >
      <Image
        src="/login-via-42.svg"
        alt="Login"
        className="dark:invert"
        width={200}
        height={24}
        priority
      />
    </Link>
  );
}

export default MainLoginButton;
