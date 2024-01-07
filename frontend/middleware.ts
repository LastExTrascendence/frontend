// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies["access_token"];
  const { pathname } = req.nextUrl;

  if (pathname.includes("/login")) {
    return NextResponse.next();
  }

  // 토큰이 없으면 로그인 페이지로 리디렉트
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 토큰이 있으면 요청을 계속 진행
  return NextResponse.next();
}
