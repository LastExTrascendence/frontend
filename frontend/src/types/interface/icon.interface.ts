/**
 * @description icon container 를 위한 interface
 *
 * @param {string} width - 아이콘 너비
 * @param {string} height - 아이콘 높이
 * @param {string} iconPath - 아이콘 path
 * @param {string} iconColor - 아이콘 fill 색깔
 * @param {string} fontColor - 폰트 색깔
 * @param {string} fontWeight - 폰트 굵기
 * @param {string} text - 아이콘 밑에 표시할 텍스트
 * @param {() => void} onClick - 아이콘 클릭시 실행할 함수
 */
export interface IconContainerProps {
  width?: number;
  height?: number;
  iconPath: string;
  iconColor?: string;
  fontColor?: string;
  fontWeight?: number;
  text?: string;
  onClick: () => void;
}
