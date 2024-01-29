import { useEffect } from "react";
import gameKeyDown from "@/api/socket/game/gameKeyDown";
import gameKeyUp from "@/api/socket/game/gameKeyUp";

export default function useGameTouchHandler(gameSocket, id, team, type) {
  useEffect(() => {
    let handleTouchStart: (event: TouchEvent) => void;
    let handleTouchEnd: (event: TouchEvent) => void;

    handleTouchStart = (event: TouchEvent) => {
      const touchY = event.touches[0].clientY;
      const touchX = event.touches[0].clientX;
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      console.log("handleTouchStart", type, touchY, screenHeight);
      if (type === "single") {
        if (touchY < screenHeight / 2 && touchX < screenWidth / 2) {
          gameKeyDown(gameSocket, id, "HOME", "ArrowUp");
        } else if (touchY >= screenHeight / 2 && touchX < screenWidth / 2) {
          gameKeyDown(gameSocket, id, "HOME", "ArrowDown");
        } else if (touchY < screenHeight / 2 && touchX >= screenWidth / 2) {
          gameKeyDown(gameSocket, id, "AWAY", "ArrowUp");
        } else {
          gameKeyDown(gameSocket, id, "AWAY", "ArrowDown");
        }
      } else {
        if (touchY < screenHeight / 2) {
          gameKeyDown(gameSocket, id, team, "ArrowUp");
        } else {
          // 화면의 오른쪽 부분 터치
          gameKeyDown(gameSocket, id, team, "ArrowDown");
        }
      }
    };

    handleTouchEnd = (event: TouchEvent) => {
      const touchY = event.changedTouches[0].clientY;
      const touchX = event.changedTouches[0].clientX;
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      console.log("handleTouchEnd", touchY, screenHeight, type);

      if (type === "single") {
        if (touchY < screenHeight / 2 && touchX < screenWidth / 2) {
          gameKeyUp(gameSocket, id, "HOME", "ArrowUp");
        } else if (touchY >= screenHeight / 2 && touchX < screenWidth / 2) {
          gameKeyUp(gameSocket, id, "HOME", "ArrowDown");
        } else if (touchY < screenHeight / 2 && touchX >= screenWidth / 2) {
          gameKeyUp(gameSocket, id, "AWAY", "ArrowUp");
        } else {
          gameKeyUp(gameSocket, id, "AWAY", "ArrowDown");
        }
      } else {
        if (touchY < screenHeight / 2) {
          gameKeyUp(gameSocket, id, team, "ArrowUp");
        } else {
          gameKeyUp(gameSocket, id, team, "ArrowDown");
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gameSocket, team, type]);
}
