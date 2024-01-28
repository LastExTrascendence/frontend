
import { useEffect } from "react";
import gameKeyDown from "@/api/socket/game/gameKeyDown";
import gameKeyUp from "@/api/socket/game/gameKeyUp";

export default function useGameKeyHandler(gameSocket, id, team, type) {
  useEffect(() => {
    const activeKeys = new Set();
    let handleKeyDown: (event: KeyboardEvent) => void;
    let handleKeyUp: (event: KeyboardEvent) => void;

    // console.log("useGameKeyHandler", id, team, type);

    if (type === "single") {
      handleKeyDown = (event: KeyboardEvent) => {
        if (activeKeys.has(event.key)) return; // 이미 눌린 키는 무시
        activeKeys.add(event.key);
        switch (event.key) {
          case "w":
          case "W":
          case "ㅈ":
            gameKeyDown(gameSocket, id, "HOME", "ArrowUp");
            break;
          case "s":
          case "S":
          case "ㄴ":
            gameKeyDown(gameSocket, id, "HOME", "ArrowDown");
            break;
          case "ArrowUp":
            gameKeyDown(gameSocket, id, "AWAY", "ArrowUp");
            break;
          case "ArrowDown":
            gameKeyDown(gameSocket, id, "AWAY", "ArrowDown");
            break;
          default:
            break;
        }
      };

      handleKeyUp = (event: KeyboardEvent) => {
        if (!activeKeys.has(event.key)) return; // 관리되지 않는 키는 무시
        activeKeys.delete(event.key);
        switch (event.key) {
          case "w":
          case "W":
          case "ㅈ":
            gameKeyUp(gameSocket, id, "HOME", "ArrowUp");
            break;
          case "s":
          case "S":
          case "ㄴ":
            gameKeyUp(gameSocket, id, "HOME", "ArrowDown");
            break;
          case "ArrowUp":
            gameKeyUp(gameSocket, id, "AWAY", "ArrowUp");
            break;
          case "ArrowDown":
            gameKeyUp(gameSocket, id, "AWAY", "ArrowDown");
            break;
          default:
            break;
        }
      }
    } else {
      handleKeyDown = (event: KeyboardEvent) => {
        if (activeKeys.has(event.key)) return; // 이미 눌린 키는 무시
        activeKeys.add(event.key);
        switch (event.key) {
          case "ArrowUp":
            gameKeyDown(gameSocket, id, team, "ArrowUp");
            break;
          case "ArrowDown":
            gameKeyDown(gameSocket, id, team, "ArrowDown");
            break;
          default:
            break;
        }
      };

      handleKeyUp = (event: KeyboardEvent) => {
        if (!activeKeys.has(event.key)) return; // 관리되지 않는 키는 무시
        activeKeys.delete(event.key);
        switch (event.key) {
          case "ArrowUp":
            gameKeyUp(gameSocket, id, team, "ArrowUp");
            break;
          case "ArrowDown":
            gameKeyUp(gameSocket, id, team, "ArrowDown");
            break;
          default:
            break;
        }
      };
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameSocket, team, type]);
}
