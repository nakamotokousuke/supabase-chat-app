import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import FriendRquest from "../Active/FriendRquest";

type FriendReqListType = {
  friendReqList: any[];
};

const FriendReqList = ({ friendReqList }: FriendReqListType) => {
  const [friendReqest, setFriendReqest] = useState<any[]>(friendReqList);
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const friendRes = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("friend_req")
        .select()
        .eq("res_user_id", user?.id);
      if (error) throw error;
      if (data) {
        setFriendReqest(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const requestListener = supabaseClient
      .channel("friend_req")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "friend_req" },
        () => {
          console.log("friendreq");
          friendRes();
        }
      )
      .subscribe();

    return () => {
      requestListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {friendReqList && (
        <div>
          <div>Request</div>
          {friendReqList.length > friendReqest.length
            ? friendReqList.map(
                (user: { id: string; req_user_id: string }, index: number) => (
                  <FriendRquest
                    key={index}
                    userId={user.req_user_id}
                    id={user.id}
                  />
                )
              )
            : friendReqest.map(
                (user: { id: string; req_user_id: string }, index: number) => (
                  <FriendRquest
                    key={index}
                    userId={user.req_user_id}
                    id={user.id}
                  />
                )
              )}
        </div>
      )}
    </div>
  );
};

export default FriendReqList;
