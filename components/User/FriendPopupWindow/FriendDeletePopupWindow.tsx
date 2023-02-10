import React, { useContext } from "react";
import { friendDelete } from "../../../function/supabase";
import { PopupContext, usePopupContext } from "../../Popup";
type FriendDeletePopupWindowType = {
  channelId: string;
};
const FriendDeletePopupWindow = ({
  channelId,
}: FriendDeletePopupWindowType) => {
  const { setButton } = usePopupContext();
  return (
    <div>
      <div>本当に削除しますか</div>
      <div className="flex space-x-4">
        <div onClick={() => friendDelete(channelId)}>はい</div>
        <div onClick={() => setButton(false)}>いいえ</div>
      </div>
    </div>
  );
};

export default FriendDeletePopupWindow;
