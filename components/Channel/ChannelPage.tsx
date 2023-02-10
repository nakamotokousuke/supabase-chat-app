import React, { Dispatch, useState } from "react";
import { useSupaBase } from "../../function/supabaseContext";
import Active from "../Active";
import Chat from "../Chat/Chat";
import ChatInf from "../Chat/ChatInf";
import ChannelSetting from "./ChannelSetting";

type channelPageType = {
  userInf: {
    name: string;
  };
  friendReq: any[];
  channelList: string[];
};
const ChannelPage = ({ userInf, friendReq, channelList }: channelPageType) => {
  const [setting, setSetting] = useState(false);
  const { activeChannel } = useSupaBase();
  return (
    <>
      {setting ? (
        <ChannelSetting setSetting={setSetting} activeChannel={activeChannel} />
      ) : (
        <div className="col-span-3 grid grid-cols-3">
          {/* <Chat channel={activeChannel} /> */}
          <ChatInf channel_id={activeChannel} />
          <Active
            userInf={userInf}
            friendReqList={friendReq}
            channelList={channelList}
            setSetting={setSetting}
          />
        </div>
      )}
    </>
  );
};

export default ChannelPage;
