import { useRef } from "react";
export default function useHorizontalScroll(scrollAmount = 300) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const target =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    container.scrollTo({ left: target, behavior: "smooth" });
  };

  return { scrollContainerRef, scroll };
}
