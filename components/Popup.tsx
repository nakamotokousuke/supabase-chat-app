import React, { createContext, ReactNode, useContext, useState } from "react";

type PopupType = {
  buttonNode: ReactNode;
  popupWindowNode: ReactNode;
};
type buttonContextType = {
  setButton: React.Dispatch<React.SetStateAction<boolean>>;
};
export function usePopupContext() {
  return useContext(PopupContext);
}
export const PopupContext = createContext({} as buttonContextType);
const Popup = ({ buttonNode, popupWindowNode }: PopupType) => {
  const [button, setButton] = useState(false);
  const value = { setButton };
  return (
    <div>
      <button onClick={() => setButton((prev) => (prev = !prev))}>
        {buttonNode}
      </button>
      {button && (
        <>
          <div
            className="absolute h-full w-full bg-black opacity-30 left-0 top-0 rgba(255,255,255, 0.2)"
            onClick={() => setButton((prev) => (prev = !prev))}
          ></div>
          <div className="z-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 bg-gray-600 w-[300px] h-[300px]">
            <PopupContext.Provider value={value}>
              {popupWindowNode}
            </PopupContext.Provider>
          </div>
        </>
      )}
    </div>
  );
};

export default Popup;
