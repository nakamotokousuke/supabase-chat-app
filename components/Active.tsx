import { useUser } from "@supabase/auth-helpers-react";
import React, { Dispatch } from "react";
import { useFetchAdminUser } from "../function/supabase";
import { useSupaBase } from "../function/supabaseContext";

import Account from "./Active/Account";
import ChannelMemberList from "./Active/ChannelMemberList";

import Popup from "./Popup";
import UserIcon from "./UserIcon";
type Active = {
  userInf: {
    name: string;
  };
  friendReqList: any[];
  channelList: string[];
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
};
const Active = (props: Active) => {
  const { userInf, setSetting } = props;
  const user = useUser();
  const { activeChannel } = useSupaBase();
  const isAdmin = useFetchAdminUser(user, activeChannel);

  return (
    <div className="bg-blue-900 rounded-r-md">
      {isAdmin && <div onClick={() => setSetting(true)}>Channel Setting</div>}
      {/* <Popup
        buttonNode={
          <div className="flex">
            <UserIcon userId={user?.id} />
            {userInf ? <div>{userInf?.name}</div> : <div>not</div>}
          </div>
        }
        popupWindowNode={<Account />}
      /> */}
      {activeChannel && <ChannelMemberList activeChannel={activeChannel} />}
    </div>
  );
};

export default Active;
