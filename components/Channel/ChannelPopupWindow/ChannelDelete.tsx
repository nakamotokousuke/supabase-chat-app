import { channelDelete } from "../../../function/supabase";
import { usePopupContext } from "../../Popup";

type ChannelDeleteType = {
  channelId: string;
};

const ChannelDelete = ({ channelId }: ChannelDeleteType) => {
  const { setButton } = usePopupContext();

  return (
    <div>
      <div>本当に削除しますか？</div>
      <div onClick={() => channelDelete(channelId)}>はい</div>
      <div onClick={() => setButton(false)}>いいえ</div>
    </div>
  );
};

export default ChannelDelete;
