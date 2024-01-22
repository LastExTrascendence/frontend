import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { myState } from "@/recoil/atom";
import Modal, { ModalTypes } from "@/components/Modals/Modal";
import MultiToggleSwitch from "@/ui/multi-toggle-switch";
import { ChannelPolicy } from "@/types/enum/channel.enum";
import { ChatCreateProps } from "@/types/interface/chat.interface";
import { axiosCreateChatChannel } from "@/api/axios/axios.custom";
import ModalPortal from "../ModalPortal";
import { FailResponseModal } from "../ResponseModal/ResponseModal";

const ChannelPolicyList = [
  { name: "Public", key: ChannelPolicy.PUBLIC },
  { name: "Private", key: ChannelPolicy.PRIVATE },
];

export default function NewChatChannelModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const router = useRouter();
  const [myInfo, setMyInfo] = useRecoilState(myState);
  const [title, setTitle] = useState("");
  const [channelPolicy, setChannelPolicy] = useState(ChannelPolicy.PUBLIC);
  const [password, setPassword] = useState("");
  const [maxUser, setMaxUser] = useState<string>("42");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [showResponseModal, setShowResponseModal] = useState<boolean>(false);

  const tryCreateChatChannel = async (event: React.MouseEvent) => {
    if (!title || Number(maxUser) < 2 || Number(maxUser) > 42) return;
    else if (channelPolicy === ChannelPolicy.PRIVATE && !password) return;
    try {
      closeModal();
      const channelData: ChatCreateProps = {
        id: 0,
        title: title,
        channelPolicy: channelPolicy,
        password: channelPolicy === ChannelPolicy.PRIVATE ? password : null,
        creatorId: myInfo.id,
        curUser: 0,
        maxUser: Number(maxUser),
      };

      const responseChannelData: ChatCreateProps =
        await axiosCreateChatChannel(channelData);

      router.push(`/channel/${responseChannelData.id}?name=${title}`);
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
          // title={"New Channel"}
          proceedBtnText={"Create"}
          cancleBtnText={"Cancel"}
          closeModal={closeModal}
          onClickProceed={tryCreateChatChannel}
        >
          <div className="relative flex h-full w-full flex-col items-start rounded-lg ">
            <label className="relative mb-3 flex flex-col items-start justify-center">
              Channel Name
              <input
                type="text"
                name="chat"
                className="mt-2 rounded bg-buttonColor p-2 text-white focus:outline-none focus:ring-2"
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
                  className="mt-2 rounded bg-buttonColor p-2 text-white focus:outline-none focus:ring-2"
                  maxLength={10}
                  minLength={1}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <label className="relative mb-3 flex flex-col items-start justify-center">
              Maximum no. of Users
              <input
                type="number"
                name="maxUser"
                className="mt-2 rounded bg-buttonColor p-2 text-white focus:outline-none focus:ring-2"
                // max={42}
                // min={2}
                onChange={(e) => setMaxUser(e.target.value)}
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
