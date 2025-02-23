import { useEffect, RefObject } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClickOutside: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    // Check if the click is outside the referenced element
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, onClickOutside]);
};

export default useClickOutside;
