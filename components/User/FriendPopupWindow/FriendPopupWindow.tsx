import React from "react";
import { useSupaBase } from "../../../function/supabaseContext";
import ChannelInvitation from "../../Channel/ChannelPopupWindow/ChannelInvitation";
import Popup from "../../Popup";
import TooltipSide from "../../TooltipSide";
import FriendDeletePopupWindow from "./FriendDeletePopupWindow";

type FriendPopupWindowType = {
  channelList: any[];
  dmChannelId: string;
};

const FriendPopupWindow = ({
  channelList,
  dmChannelId,
}: FriendPopupWindowType) => {
  const { setActiveChannel } = useSupaBase();

  return (
    <div className="min-w-max bg-gray-900 border">
      <div className="divide-y divide-slate-700">
        <div
          className="min-w-[100px] px-2 py-1"
          onClick={() => setActiveChannel(dmChannelId)}
        >
          チャット
        </div>

        <TooltipSide
          tooltipText={
            <ChannelInvitation
              channelList={channelList}
              dmChannelId={dmChannelId}
            />
          }
        >
          <div className="min-w-[100px] px-2 py-1">招待</div>
        </TooltipSide>
        <Popup
          buttonNode={
            <div className="min-w-[100px] text-red-700 px-2 py-1">
              フレンド削除
            </div>
          }
          popupWindowNode={<FriendDeletePopupWindow channelId={dmChannelId} />}
        />
      </div>
    </div>
  );
};

export default FriendPopupWindow;
