import { useState } from "react";
import { useRecoilState } from "recoil";
import ModalPortal from "../ModalPortal";
import Modal, { ModalTypes } from "@/ui/Modals/Modal";
import MultiToggleSwitch from "@/ui/multi-toggle-switch";
import { GameMode, GameType } from "@/types/enum/game.enum";
import { ChannelPolicy } from "@/types/enum/channel.enum";
import { axiosCreateGame } from "@/api/axios/axios.custom";
import { userState } from "@/recoil/atom";

const ChannelPolicyList = [
  { name: "Public", key: ChannelPolicy.PUBLIC },
  { name: "Private", key: ChannelPolicy.PRIVATE },
];

const GameModeList = [
  { name: "Normal", key: GameMode.NORMAL },
  { name: "Speed", key: GameMode.SPEED },
];

const GameTypeList = [
  { name: "Normal", key: GameType.NORMAL },
  { name: "Ladder", key: GameType.LADDER },
];

const NewGameModal = ({ closeModal }: { closeModal: () => void }) => {
  const [myInfo, setMyInfo] = useRecoilState(userState);
  const [title, setTitle] = useState("");
  const [channelPolicy, setChannelPolicy] = useState(ChannelPolicy.PUBLIC);
  const [password, setPassword] = useState("");
  const [gameType, setGameType] = useState(GameType.NORMAL);
  const [gameMode, setGameMode] = useState(GameMode.NORMAL);

  const tryCreateGame = async (event: React.MouseEvent) => {
    if (!title) return;
    else if (channelPolicy === ChannelPolicy.PRIVATE && !password) return;
    try {
      const channelId = await axiosCreateGame(
        title,
        channelPolicy,
        channelPolicy === ChannelPolicy.PRIVATE ? password : null,
        myInfo.id,
        gameType,
        gameMode,
      );
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      closeModal();
    }
  };

  return (
    <ModalPortal>
      <Modal
        type={ModalTypes.hasProceedBtn}
        title={"New Game"}
        proceedBtnText={"Create"}
        cancleBtnText={"Cancel"}
        closeModal={closeModal}
        onClickProceed={tryCreateGame}
      >
        <div className="relative flex h-full w-full flex-col items-start rounded-lg ">
          <label className="relative mb-3 flex flex-col items-start justify-center">
            Game Name
            <input
              type="text"
              name="game"
              className="mt-2 rounded bg-buttonColor p-2 text-white focus:bg-violet-400 focus:outline-none focus:ring-2"
              maxLength={20}
              minLength={1}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="relative mb-3 flex flex-col items-start justify-center">
            Room Type
            <MultiToggleSwitch
              initialState={ChannelPolicy.PUBLIC}
              setState={setChannelPolicy}
              toggleList={ChannelPolicyList}
              width="150px"
            />
          </label>
          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
              channelPolicy === ChannelPolicy.PRIVATE
                ? "mb-3 max-h-40"
                : "max-h-0"
            }`}
          >
            <label className="flex flex-col items-start justify-center">
              Password
              <input
                type="password"
                name="password"
                className="mt-2 rounded bg-buttonColor p-2 text-white focus:bg-violet-400 focus:outline-none focus:ring-2"
                maxLength={10}
                minLength={1}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <label className="relative mb-3 flex flex-col items-start justify-center">
            Game Mode
            <MultiToggleSwitch
              initialState={GameMode.NORMAL}
              setState={setGameMode}
              toggleList={GameModeList}
              width="150px"
            />
          </label>
          <label className="relative mb-3 flex flex-col items-start justify-center">
            Game Type
            <MultiToggleSwitch
              initialState={GameType.NORMAL}
              setState={setGameType}
              toggleList={GameTypeList}
              width="150px"
            />
          </label>
        </div>
      </Modal>
    </ModalPortal>
  );
};

export default NewGameModal;
