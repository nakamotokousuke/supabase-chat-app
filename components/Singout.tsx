import React from "react";
import { signOut } from "../function/supabase";

const Singout = () => {
  return <div onClick={signOut}>Singout</div>;
};

export default Singout;
