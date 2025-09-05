import { useState, useCallback } from "react";

/**
 * CapsLock 상태를 감지하는 커스텀 훅입니다.
 * @returns {object} isCapsLockOn: CapsLock 활성화 여부 (boolean)
 * @returns {object} capsLockProps: input 요소에 적용할 onKeyDown, onKeyUp 이벤트 핸들러
 */
export const useCapsLock = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  // useCallback으로 함수를 메모이제이션하여 불필요한 리렌더링을 방지합니다.
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // 키보드 이벤트에서 CapsLock 상태를 가져와 업데이트합니다.
    setIsCapsLockOn(e.getModifierState("CapsLock"));
  }, []);

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    setIsCapsLockOn(e.getModifierState("CapsLock"));
  }, []);

  // 상태와 이벤트 핸들러들을 객체로 묶어 반환합니다.
  return {
    isCapsLockOn,
    capsLockProps: {
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    },
  };
};