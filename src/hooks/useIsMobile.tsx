import { useEffect, useState } from "react";

const useIsMobile = () => {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const [isMobile, setIsMobile] = useState(mediaQuery.matches);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mediaQuery]);

  return isMobile;
};

export default useIsMobile;
