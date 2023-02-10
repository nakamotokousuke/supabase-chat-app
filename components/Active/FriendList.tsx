import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { Dispatch, useEffect, useState } from "react";
import { useSupaBase } from "../../function/supabaseContext";
import Friend from "./Friend";
type channelList = {
  channelList: string[];
};
const FriendList = ({ channelList }: channelList) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [friendList, setFriendList] = useState<any>([]);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("dm_channel_member")
        .select()
        .eq("user_id", user?.id);
      if (error) throw error;
      console.log(data);

      setFriendList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-4">friend List</div>
      <div className="pl-4">
        {friendList &&
          friendList.map(
            (friend: { user_id: string; dm_channel_id: string }) => (
              <Friend
                key={friend.dm_channel_id}
                dmChannelId={friend.dm_channel_id}
                channelList={channelList}
              />
            )
          )}
      </div>
    </div>
  );
};

export default FriendList;
