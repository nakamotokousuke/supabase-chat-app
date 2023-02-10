import React, { useState } from "react";
import { changeChannelName } from "../../../function/supabase";

type ChannelNameChangeType = {
  channelId: string;
};

const ChannelNameChange = ({ channelId }: ChannelNameChangeType) => {
  const [name, setName] = useState("");
  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => changeChannelName(name, channelId)}>
        ChannelNameChange
      </button>
    </div>
  );
};

export default ChannelNameChange;
