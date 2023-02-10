import React, { useState } from "react";
import { changeEmail } from "../../../function/supabase";

const EmailChange = () => {
  const [email, setEmail] = useState("");
  return (
    <div>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => changeEmail(email)}>alter</button>
    </div>
  );
};

export default EmailChange;
