import { ReactNode, useRef } from "react";

// ツールチップ内に表示するためのprops
type Props = {
  tooltipText: string | ReactNode;
  children: string | ReactNode;
};

// ツールチップ
const TooltipSide: React.FC<Props> = ({ tooltipText, children }) => {
  // ツールチップの文言自体のためのref
  const ref = useRef<HTMLDivElement>(null);

  // マウスが乗ったらツールチップを表示
  const handleMouseEnter = () => {
    if (!ref.current) return;
    ref.current.style.opacity = "1";
    ref.current.style.visibility = "visible";
  };
  // マウスが離れたらツールチップを非表示
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.opacity = "0";
    ref.current.style.visibility = "hidden";
  };

  // top,left,bottm,right translate-yx で調整 childrenのwidthを入れる

  //before:transform before:rotate-45 before:-translate-x-1/2 before:bg-black before:absolute before:block before:w-2 before:h-2
  return (
    <div className="relative max-w-max z-10">
      <div
        className={`absolute invisible left-full top-1/2 -translate-y-1/2 text-white bg-black border`}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {tooltipText}
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </div>
  );
};

export default TooltipSide;
