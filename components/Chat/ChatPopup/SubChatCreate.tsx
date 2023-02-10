import React, { useState } from "react";
import { createSubChat } from "../../../function/supabase";
type SubChatCreateType = {
  channel_id: string;
};
const SubChatCreate = ({ channel_id }: SubChatCreateType) => {
  const [name, setName] = useState("");
  return (
    <div>
      <div>サブチャットを作成</div>
      <div>
        <div>サブチャット名</div>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <div onClick={() => createSubChat(channel_id, name)}>作成</div>
      </div>
    </div>
  );
};

export default SubChatCreate;
