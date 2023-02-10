import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

const FriendSearch = () => {
  const [searchUser, setSearchUser] = useState("");
  const [findList, setFindList] = useState<any>([]);
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const searchFriend = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("user_table")
        .select()
        .eq("name", searchUser);
      if (error) throw error;
      console.log(data);
      setFindList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const friendReq = async (resUser: string) => {
    try {
      const { error } = await supabaseClient
        .from("friend_req")
        .insert({ req_user_id: user?.id, res_user_id: resUser });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearchUser(e.target.value)}
        className="w-max text-black"
      />
      <button onClick={searchFriend}>search</button>
      {findList ? (
        <div>
          <div>find List</div>
          <ul>
            {findList.map((user: { name: string; user_id: string }) => (
              <li key={user.user_id} onClick={() => friendReq(user.user_id)}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>not find</div>
      )}
    </div>
  );
};

export default FriendSearch;
