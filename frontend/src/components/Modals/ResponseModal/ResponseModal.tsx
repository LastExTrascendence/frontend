import React from "react";
import Modal, { ModalTypes } from "@/components/Modals/Modal";
import ModalPortal from "@/components/Modals/ModalPortal";

export const SuccessResponseModal: React.FC<{
  modalTitle?: string;
  closeModal: React.MouseEventHandler;
}> = (props) => {
  return (
    <ModalPortal>
      <Modal
        type={ModalTypes.noBtn}
        icon={"/check.svg"}
        iconScaleEffect={true}
        title={props.modalTitle ?? "처리되었습니다"}
        closeModal={props.closeModal}
      />
    </ModalPortal>
  );
};

export const FailResponseModal: React.FC<{
  modalTitle?: string;
  closeModal: React.MouseEventHandler;
}> = (props) => {
  return (
    <ModalPortal>
      <Modal
        type={ModalTypes.noBtn}
        icon={"/cancel.svg"}
        iconScaleEffect={true}
        title={props.modalTitle ?? "실패했습니다"}
        closeModal={props.closeModal}
      />
    </ModalPortal>
  );
};
