"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal, { ModalTypes } from "@/components/Modals/Modal";
import ModalPortal from "@/components/Modals/ModalPortal";
import { axiosEnterPrivateChannel } from "@/api/axios/axios.custom";

export default function PrivateChannelModal({
  channelId,
  myInfoId,
  title,
  closeModal,
}) {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const tryEnterPrivateChannel = async (event: React.MouseEvent) => {
    try {
      const response = await axiosEnterPrivateChannel(
        channelId,
        password,
        myInfoId,
      );
      router.push(`/game/${channelId}?name=${title}`);
    } catch (error: any) {
      console.log(error);
      // 추가적인 에러 처리
    }
  }

  return (
    <ModalPortal>
      <Modal
        type={ModalTypes.hasProceedBtn}
        proceedBtnText="Enter"
        cancleBtnText="Cancel"
        closeModal={closeModal}
        onClickProceed={tryEnterPrivateChannel}
      >
        <input
          type="password"
          className="mt-2 mb-8 h-12 rounded bg-buttonColor px-4 py-3 text-lg text-white focus:outline-none focus:ring-2 placeholder-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </Modal>
    </ModalPortal>
  );
}
