import React, { useState } from "react";
import { useChannelMemberList } from "../../function/supabase";
import ChannelMember from "./ChannelMember";

const ChannelMemberList = ({ activeChannel }: any) => {
  //   const { activeChannel } = props;

  const [channelMemberList, setChannelMemberList] = useState<any>([]);
  useChannelMemberList(activeChannel, setChannelMemberList);
  return (
    <div>
      {channelMemberList &&
        channelMemberList.map((member: { user_id: string }) => (
          <ChannelMember key={member.user_id} id={member.user_id} />
        ))}
    </div>
  );
};

export default ChannelMemberList;
