"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import { myState } from "@/recoil/atom";
import { getCookie } from "@/api/cookie/cookies";
import UserSocketContextType from "@/types/user-socket.type";

const SocketContext = createContext<UserSocketContextType>({
  socket: null,
  isConnected: false,
  enterQueue: () => { },
  exitQueue: () => { },
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const myInfo = useRecoilValue(myState);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(getCookie("access_token"));

  function CustomToast({ hostNickname, url }) {
    const [pathname, query] = url.split("?");

    let name = "";
    if (query) {
      const params = new URLSearchParams(query);
      if (params.has("name")) {
        name = params.get("name");
      }
    }
    return (
      <div>
        {hostNickname} 님께서 {name}방으로 초대했습니다.
        <button
          onClick={() => {
            router.push(url);
          }}
        >
          수락
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("disconnect", async () => {
      setIsConnected(false);
    });
  }, []);

  useEffect(() => {
    const socketInstance = io(
      `http://${process.env.FE_DOMAIN}:${process.env.NEXT_PUBLIC_USER_PORT}/user`,
      {
        auth: {
          token: `Bearer ${token}`,
          user: {
            id: `${myInfo.id}`,
            nickname: `${myInfo.nickname}`,
          },
        },
      },
    );

    socketInstance.on("connect", async () => {
      setIsConnected(true);
    });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, [myInfo.id, myInfo.nickname, token]);

  const enterQueue = () => {
    if (socket) {
      socket.emit("enterQueue", { userId: myInfo.id });
    }
  };

  const exitQueue = () => {
    if (socket) {
      socket.emit("exitQueue", { userId: myInfo.id });
    }
  };

  // queue connect handler
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(
      "gameMatch",
      async ({ gameId, title }: { gameId: string; title: string }) => {
        await router.replace(`/game/${gameId}?name=${title}`);
      },
    );

    return () => {
      socket.off("gameMatch");
    };
  }, [socket]);

  // game invited user
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(
      "invitedUser",
      async ({ hostNickname, url }: { hostNickname: string; url: string }) => {
        const notify = () =>
          toast(<CustomToast hostNickname={hostNickname} url={url} />);
        notify();
      },
    );
    return () => {
      socket.off("invitedUser");
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, enterQueue, exitQueue }}
    >
      {children}
    </SocketContext.Provider>
  );
}
