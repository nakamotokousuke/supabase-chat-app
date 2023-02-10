import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Chat from "../Chat/Chat";
import UserIcon from "../UserIcon";
import { useSupaBase } from "../../function/supabaseContext";
type channel = {
  channel: any;
  userInf: any;
};
const Channel = ({
  channel,
  // setActiveChannel,
  // activeChannel,
  userInf,
}: channel) => {
  const { setActiveChannel, activeChannel } = useSupaBase();
  const supabaseClient = useSupabaseClient();
  const [channelInf, setChannelInf] = useState<any>({});
  const getChannel = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("channel_table")
        .select()
        .eq("id", channel.id);
      if (error) throw error;
      console.log("channel", data);
      setChannelInf(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChannel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);
  return (
    <div className="">
      {channelInf && (
        <div className="flex" onClick={() => setActiveChannel(channelInf.id)}>
          <UserIcon userId={channelInf.id} />
          <div className="mx-1">{channelInf.name}</div>
        </div>
      )}
    </div>
  );
};

export default Channel;
