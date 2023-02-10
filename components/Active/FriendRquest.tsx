import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
type FriendRquest = {
  userId: string;
  id: string;
};
const FriendRquest = (props: FriendRquest) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [reqUser, setReqUser] = useState<any>();
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userId]);

  const get = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("user_table")
        .select()
        .eq("user_id", props.userId);
      if (error) throw error;
      console.log(data);

      setReqUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const approval = async () => {
    try {
      const { error } = await supabaseClient.from("friends").insert([
        { friend_id: props.userId, user_id: user?.id },
        { friend_id: user?.id, user_id: props.userId },
      ]);
      if (error) throw error;
      deleteReq();
      createDmChannel();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReq = async () => {
    try {
      const { error } = await supabaseClient
        .from("friend_req")
        .delete()
        .eq("id", props.id);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const createDmChannel = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("dm_channel")
        .insert({})
        .select();
      if (error) throw error;
      deleteReq();
      console.log("createDmchannel", data);

      createDmChannelMember(data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const createDmChannelMember = async (dmChannelId: string) => {
    try {
      const { error } = await supabaseClient.from("dm_channel_member").insert([
        { dm_channel_id: dmChannelId, user_id: user?.id },
        { dm_channel_id: dmChannelId, user_id: props.userId },
      ]);
      if (error) throw error;
      console.log("dm_member");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>{reqUser && reqUser.name}</div>
      <div onClick={createDmChannel}>追加</div>
      <div onClick={deleteReq}>削除</div>
    </div>
  );
};

export default FriendRquest;
