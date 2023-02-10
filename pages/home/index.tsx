import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import User from "../../components/User/User";
import { useRouter } from "next/router";
import ChannelPage from "../../components/Channel/ChannelPage";
import { useSupaBase } from "../../function/supabaseContext";

const Home: NextPage = () => {
  const { activeChannel } = useSupaBase();
  const [userInf, setUserInf] = useState<any>({});
  const [channelList, setChannelList] = useState<any[]>([]);
  // const [activeChannel, setActiveChannel] = useState<any>("User");
  const [FriendReq, setFriendReq] = useState<any[]>([]);
  const [friendList, setFriendList] = useState<any>([]);
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const get = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("user_table")
        .select()
        .eq("user_id", user?.id);
      if (error) throw error;
      setUserInf(data?.[0]);
      console.log(data);
    } catch (error) {
      console.log(user, error);
    }
  };

  const getChannel = async () => {
    if (user === null) return;
    try {
      const { data, error } = await supabaseClient
        .from("channel_table")
        .select("*, channel_member!inner(*)")
        .eq("channel_member.user_id", user?.id);
      // .select("*, channel_member(*)")
      if (error) throw error;
      console.log(data);

      setChannelList(data);
      console.log("Navbar", data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFriendReq = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("friend_req")
        .select()
        .eq("res_user_id", user?.id);
      if (error) throw error;
      console.log(data);

      setFriendReq(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFriendList = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("dm_channel")
        .select("*,dm_channel_member!inner(*)")
        .eq("dm_channel_member.user_id", user?.id);
      if (error) throw error;
      console.log(data);

      setFriendList(data);
    } catch (error) {}
  };

  // const getUser = async (reqUser) => {
  //   try {
  //     const {data, error} = await supabaseClient.from("user_table").select().eq("user_id", reqUser)
  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    if (user) {
      get();
      getChannel();
      getFriendReq();
      getFriendList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (!user) return <div onClick={() => router.push("/login")}>login page</div>;
  // if (!user) {
  //   router.push("/login");
  //   return null;
  // }
  return (
    <div className="h-screen flex">
      <div className="bg-black text-white w-[80%] h-[80%] m-auto rounded-md grid grid-cols-4">
        <Navbar
          channelList={channelList}
          setChannelList={setChannelList}
          friendList={friendList}
          FriendReq={FriendReq}
          userInf={userInf}
        />

        {activeChannel === "User" ? (
          <User
            userInf={userInf}
            friendReqList={FriendReq}
            channelList={channelList}
          />
        ) : activeChannel === "setting" ? (
          <div>setting</div>
        ) : (
          channelList
            .concat(friendList)
            .map(
              (channel: { id: string }) =>
                activeChannel === channel.id && (
                  <ChannelPage
                    key={channel.id}
                    userInf={userInf}
                    friendReq={FriendReq}
                    channelList={channelList}
                  />
                )
            )
        )}
      </div>
    </div>
  );
};

export default Home;
