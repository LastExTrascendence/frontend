import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { myState } from "@/recoil/atom";
import Modal, { ModalTypes } from "@/components/Modals/Modal";
import ModalPortal from "@/components/Modals/ModalPortal";
import { FailResponseModal } from "@/components/Modals/ResponseModal/ResponseModal";
import MultiToggleSwitch from "@/ui/multi-toggle-switch";
import { ChannelPolicy } from "@/types/enum/channel.enum";
import { GameMode, GameType } from "@/types/enum/game.enum";
import { axiosCreateGame } from "@/api/axios/axios.custom";

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

export default function NewGameChannelModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const router = useRouter();
  const [myInfo, setMyInfo] = useRecoilState(myState);
  const [title, setTitle] = useState("");
  const [channelPolicy, setChannelPolicy] = useState(ChannelPolicy.PUBLIC);
  const [password, setPassword] = useState("");
  const [gameType, setGameType] = useState(GameType.NORMAL);
  const [gameMode, setGameMode] = useState(GameMode.NORMAL);
  const [showResponseModal, setShowResponseModal] = useState<boolean>(false);

  const tryCreateGame = async (event: React.MouseEvent) => {
    if (!title) return;
    else if (channelPolicy === ChannelPolicy.PRIVATE && !password) return;
    try {
      const game = await axiosCreateGame(
        title,
        channelPolicy,
        channelPolicy === ChannelPolicy.PRIVATE ? password : null,
        myInfo.id,
        gameType,
        gameMode,
      );
      router.push(`/game/${game.data.id}?name=${title}`);
    } catch (error: any) {
      console.log(error);
      // setModalTitle(error.response.data.message);
      setShowResponseModal(true);
      throw error;
    }
    // finally {
    //   closeModal();
    // }
  };

  return (
    <ModalPortal>
      {!showResponseModal && (
        <Modal
          type={ModalTypes.hasProceedBtn}
          // title={"New Game"}
          proceedBtnText={"Create"}
          cancleBtnText={"Cancel"}
          closeModal={closeModal}
          onClickProceed={tryCreateGame}
        >
          <div className="relative flex h-full w-9/12 flex-col items-center rounded-lg ">
            <label className="relative mb-3 flex flex-col items-start justify-center">
              Game Name
              <input
                type="text"
                name="game"
                className="mt-2 h-12 rounded bg-buttonColor px-4 py-3 text-lg text-white focus:outline-none focus:ring-2"
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
              className={`relative overflow-hidden transition-all duration-500 ease-in-out ${channelPolicy === ChannelPolicy.PRIVATE
                ? "mb-3 max-h-40"
                : "max-h-0"
                }`}
            >
              <label className="flex flex-col items-start justify-center">
                Password
                <input
                  type="password"
                  name="password"
                  className="mt-2 rounded bg-buttonColor p-2 text-white focus:outline-none focus:ring-2"
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
      )}
      {showResponseModal && (
        <FailResponseModal
          // modalTitle={modalTitle}
          closeModal={closeModal}
        />
      )}
    </ModalPortal>
  );
}
