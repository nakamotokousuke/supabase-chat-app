import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { channelInvitation, useFetchChannel } from "../../../function/supabase";
import UserIcon from "../../UserIcon";
type InvitationListType = {
  channelId: string;
  dmChannelId: string;
};
const InvitationList = ({ channelId, dmChannelId }: InvitationListType) => {
  const data = useFetchChannel(channelId);
  const user = useUser();

  return (
    <div
      className="flex"
      onClick={() => channelInvitation(user, dmChannelId, channelId)}
    >
      <UserIcon userId={channelId} />
      {data && <div className="mx-1">{data.name}</div>}
    </div>
  );
};

export default InvitationList;
