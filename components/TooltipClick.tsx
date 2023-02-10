import React, { ReactNode, useState } from "react";

type ToolTipType = {
  buttonNode: ReactNode;
  popupNode: ReactNode;
};

const TooltipClick = ({ buttonNode, popupNode }: ToolTipType) => {
  const [tooltip, setTooltip] = useState(false);

  return (
    <>
      <div className="relative bg-blue-200 rounded-full max-w-max">
        <div onClick={() => setTooltip(true)}>{buttonNode}</div>
        {tooltip && (
          <>
            <div className="absolute left-full top-1/2 -translate-y-1/2 z-50">
              {popupNode}
            </div>
          </>
        )}
      </div>
      {tooltip && (
        <div
          onClick={() => setTooltip(false)}
          className="absolute h-full w-full left-0 top-0 z-10"
        />
      )}
    </>
  );
};

export default TooltipClick;
