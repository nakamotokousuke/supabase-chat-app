import React from "react";
import { deleteSubChat } from "../../../function/supabase";
import { usePopupContext } from "../../Popup";
type SubChatDeleteType = {
  subChatId: string;
};
const SubChatDelete = ({ subChatId }: SubChatDeleteType) => {
  const { setButton } = usePopupContext();
  return (
    <div>
      <div onClick={() => deleteSubChat(subChatId)}>削除</div>
      <div onClick={() => setButton(false)}>キャンセル</div>
    </div>
  );
};

export default SubChatDelete;
