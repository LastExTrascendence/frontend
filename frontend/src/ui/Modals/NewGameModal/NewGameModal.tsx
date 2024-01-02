import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../ModalPortal";
import Modal, { IModalContents, ModalTypes } from "@/ui/Modals/Modal";
import GameType from "@/ui/overview/game/game-type";
import MaximumUser from "@/ui/overview/game/maximum-user";

const NewGameModal = ({
  closeModal,
}: {
  closeModal: React.MouseEventHandler;
}) => {
  const [userCount, setUserCount] = useState("2");
  const [gameType, setGameType] = useState("public");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      game: event.target.game.value,
      userCount,
      gameType,
      password: event.target.password.value,
    };
    // TODO - send data to backend -> redirection 논의
    closeModal(event);
    console.log(data);
  };

  const newGameModalContents: IModalContents = {
    type: ModalTypes.hasProceedBtn,
    title: "Create New Game",
    renderAdditionalComponent: () => {
      return (
        // title, creator_id, user_id, room_type, pw, mode(normal, ladder), type(normal, speed)
        <form
          onSubmit={handleSubmit}
          className="relative flex h-full w-full flex-col items-start rounded-lg text-[#827AAF]"
        >
          <label className="relative mb-3 flex flex-col items-start justify-center">
            Game Name
            <input
              type="text"
              name="game"
              className="mt-2 rounded bg-buttonColor p-2 text-white focus:bg-violet-400 focus:outline-none focus:ring-2"
            />
          </label>
          <GameType gameType={gameType} setGameType={setGameType} />
          <button
            type="submit"
            className="hover:bg-modalColor w-full rounded  bg-violet-400 p-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
          >
            Create
          </button>
        </form>
      );
    },
    proceedBtnText: "Create",
    cancleBtnText: "Cancel",
    closeModal: closeModal,
  };
  return (
    <ModalPortal>
      <Modal modalContents={newGameModalContents} />
    </ModalPortal>
  );
};

export default NewGameModal;
