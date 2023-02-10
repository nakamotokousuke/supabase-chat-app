import React from "react";
import Popup from "../Popup";
import Singout from "../Singout";
import IconChange from "./EditPopup/IconChange";
import NameChange from "./EditPopup/NameChange";

const Setting = () => {
  return (
    <div>
      <div>
        <Popup buttonNode={<p>rename</p>} popupWindowNode={<NameChange />} />
        <Popup
          buttonNode={<p>icon change</p>}
          popupWindowNode={<IconChange />}
        />
        <Popup buttonNode={<p>mail change</p>} popupWindowNode={<p>test</p>} />
        <Popup
          buttonNode={<p>password change</p>}
          popupWindowNode={<p>test</p>}
        />
      </div>
      <Popup buttonNode={<div>Singout</div>} popupWindowNode={<Singout />} />
    </div>
  );
};

export default Setting;
