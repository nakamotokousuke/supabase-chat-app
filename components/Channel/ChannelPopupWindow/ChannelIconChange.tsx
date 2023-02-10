import React, { useState } from "react";
import { IconUpload } from "../../../function/supabase";

type ChannelIconChangeType = {
  channelId: string;
};

const ChannelIconChange = ({ channelId }: ChannelIconChangeType) => {
  const [icon, setIcon] = useState<any>({});
  return (
    <>
      <input type="file" onChange={(e) => setIcon(e.target.files)} />
      <button onClick={() => IconUpload(channelId, icon)}>button</button>
    </>
  );
};

export default ChannelIconChange;
