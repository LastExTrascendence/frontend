"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import Modal, { ModalTypes } from "@/components/Modals/Modal";
import ModalPortal from "@/components/Modals/ModalPortal";
import { axiosEnterPrivateGame } from "@/api/axios/axios.custom";

export default function PrivateGameModal({
  gameId,
  myInfoId,
  title,
  closeModal,
}) {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { t } = useTranslation('game');

  const tryEnterPrivateGame = async (event: React.MouseEvent) => {
    try {
      const response = await axiosEnterPrivateGame(
        gameId,
        password,
        myInfoId,
      );
      router.push(`/game/${gameId}?name=${title}`);
    } catch (error: any) {
      console.log(error);
      // 추가적인 에러 처리
    }
  }

  return (
    <ModalPortal>
      <Modal
        type={ModalTypes.hasProceedBtn}
        proceedBtnText={t("enter")}
        cancelBtnText={t("cancel")}
        closeModal={closeModal}
        onClickProceed={tryEnterPrivateGame}
      >
        <input
          type="password"
          className="mt-2 mb-8 h-12 rounded bg-buttonColor px-4 py-3 text-lg text-white focus:outline-none focus:ring-2 placeholder-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("enterPassword")}
        />
      </Modal>
    </ModalPortal>
  );
}
