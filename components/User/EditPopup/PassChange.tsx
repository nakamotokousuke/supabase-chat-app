import React, { useState } from "react";
import { changePassword } from "../../../function/supabase";

const PassChange = () => {
  const [password, setPassword] = useState("");
  return (
    <div>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => changePassword(password)}>alter</button>
    </div>
  );
};

export default PassChange;
