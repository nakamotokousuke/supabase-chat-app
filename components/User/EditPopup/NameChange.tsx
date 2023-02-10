import { useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { changeName } from "../../../function/supabase";

const NameChange = () => {
  const [name, setName] = useState("");
  const user = useUser();
  return (
    <div>
      NameChange
      <div>
        <input
          className="text-black"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => changeName(name, user)}>alter</button>
      </div>
    </div>
  );
};

export default NameChange;
