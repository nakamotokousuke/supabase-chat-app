import { memo, ReactNode, useRef } from "react";

// ツールチップ内に表示するためのprops
type Props = {
  tooltipText: string | ReactNode;
  children: ReactNode;
  width: number | undefined;
};

// ツールチップ
export const Tooltip: React.FC<Props> = memo(
  ({ tooltipText, children, width }) => {
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

    return (
      <div className="flex relative items-center">
        <div
          className={`flex absolute left-0 invisible z-10 before:z-0 items-center py-[2px] px-2 mx-auto mt-2 text-xs text-white whitespace-nowrap rounded transition-all duration-150 transform`}
          ref={ref}
          style={{ transform: `translate(${width}px)` }}
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
  }
);

Tooltip.displayName = "Tooltip";
