import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { Dispatch, useEffect, useState } from "react";
import {
  channelInvitation,
  useGetFriendData,
  useGetUser,
} from "../../function/supabase";
import { useSupaBase } from "../../function/supabaseContext";
import { Tooltip } from "../Tooltip";
import TooltipClick from "../TooltipClick";
import FriendPopupWindow from "../User/FriendPopupWindow/FriendPopupWindow";
import UserIcon from "../UserIcon";

type Friend = {
  dmChannelId: string;
  channelList: string[];
};
const Friend = ({ dmChannelId, channelList }: any) => {
  const [userData, setUserData] = useState<any>();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const {} = useSupaBase();
  const { setActiveChannel } = useSupaBase();

  useGetFriendData(dmChannelId, setUserData);

  // useGetUser("user_id", FriendId, setUserData);

  //useContextTest
  const channelInvitation1 = async (invitation: string) => {
    try {
      const { error } = await supabaseClient.from("chat_table").insert({
        user_id: user?.id,
        channel_id: dmChannelId,
        invitation_channel: invitation,
      });
      if (error) throw error;
      console.log("channel invitation");
    } catch (error) {
      console.log(error);
    }
  };
  if (!user) return null;

  return (
    <div className="flex">
      <div onClick={() => setActiveChannel(dmChannelId)}>
        {userData && (
          <div className="flex">
            <UserIcon userId={userData.user_id} />
            <div className="mx-1 min-w-[49px]">{userData.name}</div>
          </div>
        )}
      </div>
      <TooltipClick
        buttonNode={<div className="flex-1 w-7 h-7">I</div>}
        popupNode={
          <FriendPopupWindow
            channelList={channelList}
            dmChannelId={dmChannelId}
          />
        }
      />
      {/* </Tooltip> */}
    </div>
  );
};

export default Friend;
