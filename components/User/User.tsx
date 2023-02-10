import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { Dispatch, useEffect, useState } from "react";
import { get, IconUpload, useUserIcon } from "../../function/supabase";
import FriendList from "../Active/FriendList";
import FriendRquest from "../Active/FriendRquest";
import FriendReqList from "./FriendReqList";
import FriendSearch from "./FriendSearch";
import Setting from "./Setting";
type Active = {
  userInf: {
    name: string;
  };
  friendReqList: any[];
  channelList: string[];
};
const User = (props: Active) => {
  const { userInf, friendReqList } = props;
  const [searchUser, setSearchUser] = useState("");
  const [findList, setFindList] = useState<any>([]);

  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [page, setPage] = useState("friendlist");
  const tags = ["friendlist", "friendrequest", "friendsearch", "setting"];

  if (!user) return null;
  // https://qiqanjfzoupbhfzfwtrr.supabase.co/storage/v1/object/public/icon/ef1e22a8-b116-4c4c-9533-c7986cce1ad4/icon

  return (
    <div className="col-span-3 bg-gray-800 rounded-r-md">
      <div className="flex space-x-4 rounded-sm p-3 ">
        {tags.map((tag) => (
          <div
            key={tag}
            className={`${
              page === tag ? "bg-blue-300" : "opacity-90"
            } rounded-md p-1 font-bold`}
            onClick={() => setPage(tag)}
          >
            {tag}
          </div>
        ))}
      </div>

      {page === "friendlist" ? (
        <FriendList channelList={props.channelList} />
      ) : page === "friendrequest" ? (
        <FriendReqList friendReqList={friendReqList} />
      ) : page === "friendsearch" ? (
        <FriendSearch />
      ) : page === "setting" ? (
        <Setting />
      ) : null}
    </div>
  );
};

export default User;
