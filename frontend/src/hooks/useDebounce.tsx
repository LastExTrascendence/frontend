import { useRef } from "react";

const useDebounce = () => {
  const debounceRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  /**
   * @description 주어진 callback 함수를 milliseconds 이후에 실행한다.
   * @param {string} key - Ref 동시 참조를 방지하기 위한 key
   * @param {Function} callback - 실행할 함수
   * @param {number} milliseconds - 딜레이 시간.
   */
  const debounce = (
    key: string,
    callback: () => void,
    milliseconds: number,
  ) => {
    if (debounceRefs.current[key]) {
      clearTimeout(debounceRefs.current[key]!);
    }
    debounceRefs.current[key] = setTimeout(() => {
      callback();
    }, milliseconds);
  };

  return {
    debounce,
  };
};

export default useDebounce;
