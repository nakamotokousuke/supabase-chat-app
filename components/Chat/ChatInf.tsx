import React, { useState } from "react";
import { useFetchSubChat } from "../../function/supabase";
import Popup from "../Popup";
import Chat from "./Chat";
import SubChatCreate from "./ChatPopup/SubChatCreate";

type ChatInfType = {
  channel_id: string;
};

const ChatInf = ({ channel_id }: ChatInfType) => {
  const [chatTable, setChatTable] = useState(channel_id);
  const subChatList = useFetchSubChat(channel_id);
  console.log("subchat", subChatList);

  if (!subChatList) return null;
  return (
    <div className="flex col-span-2">
      <div>
        <div onClick={() => setChatTable(channel_id)}>Main Chat Room</div>
        {subChatList.map((subChat: { name: string; id: string }) => (
          <div key={subChat.id} onClick={() => setChatTable(subChat.id)}>
            {subChat.name}
          </div>
        ))}
        <Popup
          buttonNode={"creat"}
          popupWindowNode={<SubChatCreate channel_id={channel_id} />}
        />
      </div>
      <div>
        {chatTable === channel_id ? (
          <Chat channel={channel_id} />
        ) : (
          subChatList.map(
            (subChat: { id: string }) =>
              chatTable === subChat.id && (
                <Chat key={subChat.id} channel={subChat.id} />
              )
          )
        )}
      </div>
    </div>
  );
};

export default ChatInf;
