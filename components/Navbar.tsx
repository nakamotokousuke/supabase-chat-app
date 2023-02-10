import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getChannel } from "../function/supabase";
import { useSupaBase } from "../function/supabaseContext";
import Channel from "./Channel/Channel";
import ChannelCreate from "./Channel/ChannelPopupWindow/ChannelCreate";
import Popup from "./Popup";

type NavbarType = {
  channelList: any[];
  setChannelList: Dispatch<SetStateAction<string[]>>;
  friendList: any[];
  FriendReq: any[];
  userInf: any;
};

const Navbar = (props: NavbarType) => {
  const {
    channelList,
    setChannelList,
    // setActiveChannel,
    // activeChannel,
    friendList,
    FriendReq,
    userInf,
  } = props;
  const [channelName, setChannelName] = useState("testChannel");
  const { setActiveChannel, activeChannel } = useSupaBase();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const createChannel = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("channel_table")
        .insert({
          name: channelName,
        })
        .select(); //selectを書くことで作ったテーブルを取得できる
      if (error) throw error;

      try {
        const { error: channelMemberError } = await supabaseClient
          .from("channel_member")
          .insert({
            channel_id: data[0].id,
            user_id: user?.id,
            is_admin: true,
          });
        if (channelMemberError) throw channelMemberError;
        console.log("Channel Created");
      } catch (channelMemberError) {
        console.log(channelMemberError);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const channelListener = supabaseClient
      .channel("chat_table")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "channel_member",
          filter: `user_id=eq.${user?.id}`,
        },
        (payload: any) => {
          console.log("payload", payload);
          getChannel(user, setChannelList);
        }
      )
      .subscribe();

    return () => {
      channelListener.unsubscribe();
    };
  }, [setChannelList, supabaseClient, user]);

  return (
    <div className="flex flex-col bg-blue-900 rounded-l-md">
      <div className="flex-1">
        <div onClick={() => setActiveChannel("User")}>Home</div>
        {/* <div
          onClick={createChannel}
          className="bg-slate-400 cursor-pointer w-max"
        >
          create channel
        </div> */}
        <Popup
          buttonNode={<div>create channel</div>}
          popupWindowNode={<ChannelCreate />}
        />
        <ul className="space-y-2 p-1">
          {channelList &&
            channelList.map((channel: any) => (
              <Channel
                key={channel.id}
                channel={channel}
                // setActiveChannel={setActiveChannel}
                // activeChannel={activeChannel}
                userInf={userInf}
              />
            ))}
        </ul>
      </div>
      <div className="">user</div>
    </div>
  );
};

export default Navbar;
