"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@/ui/card";
import PillButton from "@/ui/pill-button";
import { getCookie } from "@/api/cookie/cookies";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const url = `${process.env.BE_SERVER}/auth/login`;

  useEffect(() => {
    const token = getCookie("access_token");
    if (token) {
      router.replace("/");
    }
  }, []);

  return (
    <Card width="360px" height="420px">
      <>
        <CardTitleWrapperStyled>
          <Image
            src="/LET_logo.svg"
            alt="LET Logo"
            width={48}
            height={48}
            priority
          />
          <CardTitleStyled>L.E.T</CardTitleStyled>
        </CardTitleWrapperStyled>
        <CardDescriptionStyled>
          A minimalistic pong service
        </CardDescriptionStyled>
        <Link href={url} passHref={true}>
          <PillButton
            width="240px"
            height="55px"
            text="Join via 42 Network"
            fontWeight="200"
            fontStyle="italic"
            theme="purple"
            onClick={() => setIsLoading(true)}
            isLoading={isLoading}
          />
        </Link>
      </>
    </Card>
  );
}

export const CardTitleWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CardTitleStyled = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: var(--main-dark-purple);
  font-style: italic;
  margin-left: 1rem;
`;

const CardDescriptionStyled = styled.div`
  display: flex;
  height: 160px;
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--main-purple);
  font-style: italic;
  justify-content: center;
  align-items: center;
`;
