import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { IconUpload } from "../../../function/supabase";

const ChannelCreate = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<any>([]);
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const createChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabaseClient
        .from("channel_table")
        .insert({
          name: name,
        })
        .select(); //selectを書くことで作ったテーブルを取得できる
      if (error) throw error;
      const channel = data[0];
      try {
        const { error: channelMemberError } = await supabaseClient
          .from("channel_member")
          .insert({
            channel_id: channel.id,
            user_id: user?.id,
            is_admin: true,
          });
        if (channelMemberError) throw channelMemberError;
        if (JSON.stringify(icon) !== "[]") IconUpload(channel.id, icon);
        console.log("Channel Created");
      } catch (channelMemberError) {
        console.log(channelMemberError);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={(e) => createChannel(e)}>
      <label>
        Channel Name:
        <input
          className="text-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Channel Icon:
        <input type="file" onChange={(e) => setIcon(e.target.files)} />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ChannelCreate;
