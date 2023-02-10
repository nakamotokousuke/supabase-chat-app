import styles from "../styles/Home.module.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className={styles.container}>
      {!session ? <div>login</div> : <div>home</div>}
    </div>
  );
}
