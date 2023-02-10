/* eslint-disable react-hooks/rules-of-hooks */
import {
  createBrowserSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useQuery } from "react-query";

export const supabase = createBrowserSupabaseClient<any>();
// const user = useUser();

export const useGetUser = (column: string, value: any, setFunction: any) => {
  const supabaseClient = useSupabaseClient();
  // const user = useUser();
  const get = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("user_table")
        .select()
        .eq(column, value);
      if (error) throw error;
      setFunction(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useFetchChannel = (channelId: string) => {
  const { data, error, isLoading } = useQuery(
    "channel" + channelId,
    async () => {
      try {
        const { data, error } = await supabase
          .from("channel_table")
          .select()
          .eq("id", channelId);
        if (error) throw error;
        console.log("channel", data);
        // setChannelInf(data[0]);
        return data[0];
      } catch (error) {
        console.log(error);
      }
    }
  );
  return data;
};

export const useGetFriendData = (
  dmChannelId: string,
  setFunction: React.Dispatch<any>
) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const getFrinedData = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("dm_channel_member")
        .select("user_table(*)")
        .eq("dm_channel_id", dmChannelId)
        .neq("user_id", user?.id);
      if (error) throw error;
      console.log("useGetFriendData", data);

      setFunction(data[0].user_table);
    } catch (error) {
      console.log("useGetFriendData", error);
    }
  };
  useEffect(() => {
    getFrinedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useChannelMemberList = (
  activeChannel: string,
  setFunction: any
) => {
  const getChannelMember = async () => {
    try {
      const { data, error } = await supabase
        .from("channel_member")
        .select()
        .eq("channel_id", activeChannel);
      if (error) throw error;
      console.log("useChannelMemberList", data);
      setFunction(data);
    } catch (error) {
      console.log("useChannelMemberList", error);
    }
  };
  useEffect(() => {
    if (activeChannel !== "") getChannelMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChannel]);
};

export const useFetchSubChat = (channelId: string): any[] | undefined => {
  const { data, error } = useQuery("subChat" + channelId, async () => {
    try {
      const { data, error } = await supabase
        .from("sub_chat")
        .select()
        .eq("channel_id", channelId);
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(error);
    }
  });
  return data;
};

export const useFetchAdminUser = (user: User | null, channelId: string) => {
  const getAdminUser = async () => {
    try {
      const { data, error } = await supabase
        .from("channel_member")
        .select()
        .eq("user_id", user?.id)
        .eq("channel_id", channelId);
      if (error) throw error;
      return data[0].is_admin;
    } catch (error) {
      console.log(error);
    }
  };
  const { data, error, isLoading } = useQuery(["admin", user], getAdminUser);
  return data;
};

export const useUserIcon = (user: string | undefined) => {
  const { data, error, isLoading } = useQuery(["icon", user], async () => {
    const { data, error } = await supabase.storage
      .from("icon")
      .list(user + "/");
    console.log("useUserIcon", data);
    if (error) throw error;

    return data;
  });

  return { data, error, isLoading };
};

export const IconUpload = async (id: string | undefined, file: any) => {
  // alert("icon change");
  try {
    const { error } = await supabase.storage
      .from("icon")
      .upload(`${id}/icon`, file[0], { upsert: true });
    // .upload(`${user?.id}/${file[0].name}`, file[0], { upsert: true });
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export const get = async (user: User | null, setFunction: any) => {
  try {
    const { data, error } = await supabase.storage
      .from("icon")
      .list(user?.id + "/");
    if (error) throw error;
    setFunction(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const channelInvitation = async (
  user: User | null,
  invitation: string,
  dmChannelId: string
) => {
  try {
    const { error } = await supabase.from("chat_table").insert({
      user_id: user?.id,
      channel_id: dmChannelId,
      invitation_channel: invitation,
    });
    if (error) throw error;
    console.log("channel invitation");
  } catch (error) {
    console.log(error);
  }
};

export const changeName = async (name: string, user: User | null) => {
  try {
    const { error } = await supabase
      .from("user_table")
      .update({ name: name })
      .eq("user_id", user?.id);
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export const changeEmail = async (newEmail: string) => {
  try {
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export const changeChannelName = async (name: string, id: string) => {
  try {
    const { error } = await supabase
      .from("channel_table")
      .update({ name: name })
      .eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export const channelDelete = async (channelId: string) => {
  try {
    const { error } = await supabase.rpc("deletee_channel", {
      delete_id: channelId,
    });
    if (error) throw error;
    alert("削除しました");
  } catch (error) {
    console.log(error);
  }
};

export const friendDelete = async (channelId: string) => {
  try {
    const { error } = await supabase.rpc("delete_friend", {
      channel_id: channelId,
    });
    if (error) throw error;
    alert("削除しました");
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("logout");
    document.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const getChannel = async (
  user: User | null,
  setfunction: Dispatch<SetStateAction<any[]>>
) => {
  if (user === null) return;
  try {
    const { data, error } = await supabase
      .from("channel_table")
      .select("*, channel_member!inner(*)")
      .eq("channel_member.user_id", user?.id);
    // .select("*, channel_member(*)")
    if (error) throw error;
    console.log(data);

    setfunction(data);
    console.log("Navbar", data);
  } catch (error) {
    console.log(error);
  }
};

export const createSubChat = async (channel_id: string, name: string) => {
  try {
    const { error } = await supabase
      .from("sub_chat")
      .insert({ channel_id: channel_id, name: name });
    if (error) throw error;
  } catch (error) {
    console.log("createSubChat", error);
  }
};

export const deleteSubChat = async (channel_id: string) => {
  try {
    const { error } = await supabase.rpc("delete_subchat", {
      delete_id: channel_id,
    });
    if (error) throw error;
    alert("削除しました");
  } catch (error) {
    console.log("deleteSubChat", error);
  }
};

// 関数の名前をつける時CRUDは先に書く 例 deleteChannel
