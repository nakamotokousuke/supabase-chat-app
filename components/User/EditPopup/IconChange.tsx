import { useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { IconUpload } from "../../../function/supabase";

const IconChange = () => {
  const user = useUser();
  const [icon, setIcon] = useState<any>({});
  return (
    <>
      <input type="file" onChange={(e) => setIcon(e.target.files)} />
      <button onClick={() => IconUpload(user?.id, icon)}>button</button>
    </>
  );
};

export default IconChange;
