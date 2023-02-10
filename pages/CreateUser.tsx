import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconUpload } from "../function/supabase";

const CreateUser: NextPage = () => {
  const [name, setName] = useState("User");
  const [icon, setIcon] = useState<any>([]);
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const UserCreate = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("user_table")
        .insert([
          {
            user_id: user?.id,
            name: name,
            icon: icon,
          },
        ])
        .single();
      console.log(data);

      if (error) throw error;
      if (icon.length !== 0) {
        IconUpload(user?.id, icon);
      }
      setName("User");
      setIcon("");
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const check = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("user_table")
        .select()
        .eq("user_id", user?.id);
      console.log(data);
      console.log(user?.id);

      if (error) throw error;

      if (data.length !== 0) router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>name</div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <div>icon</div>
      <input type="file" onChange={(e) => setIcon(e.target.files)} />
      <button onClick={UserCreate}>correct</button>
    </div>
  );
};

export default CreateUser;
