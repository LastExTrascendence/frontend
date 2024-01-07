import { UserDto } from "./user.interface";

/**
 * @description 채팅 메시지를 표시하기 위한 인터페이스
 * @param {string} time - 메시지 전송 시간
 * @param {string} sender - 메시지 전송자
 * @param {string} content - 메시지 내용
 */
export interface Message {
  time: string | Date;
  sender: string;
  content: string;
}

/**
 * @description 채팅방 유저 정보를 표시하기 위한 인터페이스
 * @param {number} id - 유저 고유 id
 * @param {string} nickname - 유저 닉네임
 * @param {string} avatar - 유저 아바타
 * @param {string} role - 유저 역할
 * @param {boolean} mute - 유저 음소거 여부
 */
export interface ChatAttendees extends UserDto {
  role: string;
  mute: boolean;
}

/**
 * @description 채팅방 입력을 위한 인터페이스
 * @param {string} currentMessage - 현재 입력된 메시지
 * @param {function} setCurrentMessage - 현재 입력된 메시지를 변경하는 함수
 * @param {function} handleKeyDown - 키보드 입력 이벤트 핸들러
 * @param {function} sendMessage - 메시지 전송 이벤트 핸들러
 * @param {string} name - 채팅방 이름
 */
export interface MessageInputProps {
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  sendMessage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name: string;
}
