import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { channelInvitation } from "../../../function/supabase";
import InvitationList from "./InvitationList";

type ChannelInvitationType = {
  channelList: any[];
  dmChannelId: string;
};

const ChannelInvitation = ({
  channelList,
  dmChannelId,
}: ChannelInvitationType) => {
  const user = useUser();
  return (
    <div className="divide-y divide-white p-2">
      {channelList &&
        channelList.map((channel: { id: string }) => (
          <div
            onClick={() => channelInvitation(user, channel.id, dmChannelId)}
            key={channel.id}
            className="hover:bg-slate-600 text-xl"
          >
            <InvitationList channelId={channel.id} dmChannelId={dmChannelId} />
          </div>
        ))}
    </div>
  );
};

export default ChannelInvitation;
