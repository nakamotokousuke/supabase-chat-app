import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type chat = {
  channel: string;
};
const Chat = (props: chat) => {
  const channel_id = props.channel;
  const [chatList, setChatList] = useState<any[]>([]);
  const [text, setText] = useState("");
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  // console.log(chats);
  // console.log(chatList);

  const sendText = async () => {
    try {
      const { error } = await supabaseClient.from("chat_table").insert({
        user_id: user?.id,
        message: text,
        channel_id: channel_id,
        parent_channel: channel_id,
      });
      if (error) throw error;
      console.log("send message");
    } catch (error) {
      console.log(error);
    }
  };

  //招待を受ける
  const channelParticipate = async (id: string | null) => {
    try {
      const { error } = await supabaseClient
        .from("channel_member")
        .insert({ channel_id: id, user_id: user?.id });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const getChat = useCallback(async () => {
    try {
      const { data, error } = await supabaseClient
        .from("chat_table")
        .select()
        .eq("channel_id", channel_id);
      if (error) throw error;
      setChatList(data);
      console.log(data);
      console.log(channel_id);
    } catch (error) {
      console.log(error);
    }
  }, [channel_id, supabaseClient]);

  useEffect(() => {
    const messageListener = supabaseClient
      .channel("chat_table")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_table",
          filter: `channel_id=eq.${channel_id}`,
        },
        (payload: any) => {
          console.log("payload", payload);
          if (payload.new.message) getChat();
        }
      )
      .subscribe();

    return () => {
      messageListener.unsubscribe();
    };
  }, [channel_id, getChat, supabaseClient]);

  useEffect(() => {
    getChat();
  }, [getChat]);

  return (
    <div className="flex flex-col bg-slate-600 h-full">
      <ul className="flex-1 overflow-hidden">
        {chatList &&
          chatList.map(
            (chat: {
              id: string;
              message: string;
              user_id: string;
              invitation_channel: string | null;
            }) =>
              chat.invitation_channel ? (
                <div
                  key={chat.id}
                  onClick={() => channelParticipate(chat.invitation_channel)}
                >
                  招待
                </div>
              ) : (
                <li
                  key={chat.id}
                  className={`${
                    chat.user_id === user?.id ? "text-end" : ""
                  } px-1 `}
                >
                  {chat.message}
                </li>
              )
          )}
      </ul>
      <div className="flex p-1 bg-slate-200">
        <input
          type="text"
          className="w-full bg-slate-500 rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendText} className="text-black">
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
