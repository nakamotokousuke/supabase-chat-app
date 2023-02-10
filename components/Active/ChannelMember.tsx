import React, { useState } from "react";
import { useGetUser } from "../../function/supabase";
type UserId = {
  id: string;
};
const ChannelMember = ({ id }: UserId) => {
  const [User, setUser] = useState<any>({});
  useGetUser("user_id", id, setUser);
  return <>{User && <div>{User.name}</div>}</>;
};

export default ChannelMember;
