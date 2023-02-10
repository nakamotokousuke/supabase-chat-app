import React from "react";
import { useFetchSubChat } from "../../function/supabase";
import Popup from "../Popup";
import ChannelDelete from "./ChannelPopupWindow/ChannelDelete";
import ChannelIconChange from "./ChannelPopupWindow/ChannelIconChange";
import ChannelNameChange from "./ChannelPopupWindow/ChannelNameChange";
import SubChatDelete from "./ChannelPopupWindow/SubChatDelete";

type ChannelSettingPage = {
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  activeChannel: string;
};
const ChannelSetting = ({ setSetting, activeChannel }: ChannelSettingPage) => {
  const subChatList = useFetchSubChat(activeChannel);
  return (
    <div>
      <div onClick={() => setSetting(false)}>戻る</div>
      <Popup
        buttonNode={<div>チャンネル名を変更</div>}
        popupWindowNode={<ChannelNameChange channelId={activeChannel} />}
      />
      <Popup
        buttonNode={<div>チャンネルアイコンを変更</div>}
        popupWindowNode={<ChannelIconChange channelId={activeChannel} />}
      />

      <Popup
        buttonNode={<div>チャンネルを削除</div>}
        popupWindowNode={<ChannelDelete channelId={activeChannel} />}
      />
      {subChatList && (
        <div>
          <div>サブチャットを削除</div>
          {subChatList.map((subChat: { id: string; name: string }) => (
            <Popup
              key={subChat.id}
              buttonNode={<div>{subChat.name}</div>}
              popupWindowNode={<SubChatDelete subChatId={subChat.id} />}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelSetting;
