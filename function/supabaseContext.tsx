import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
type SupabaseContextType = {
  channelInvitation: (invitation: string, dmChannelId: string) => Promise<void>;
  activeChannel: string;
  setActiveChannel: Dispatch<SetStateAction<string>>;
};
type props = {
  children: ReactNode;
};

const SupabaseUseContext = createContext({} as SupabaseContextType);
export function useSupaBase() {
  return useContext(SupabaseUseContext);
}

export const SupabaseContext = ({ children }: props) => {
  const [activeChannel, setActiveChannel] = useState<string>("User");
  const supabase = useSupabaseClient();
  const user = useUser();

  const channelInvitation = async (invitation: string, dmChannelId: string) => {
    try {
      const { error } = await supabase.from("chat_table").insert({
        user_id: user?.id,
        channel_id: dmChannelId,
        invitation_channel: invitation,
      });
      if (error) throw error;
      console.log("channel invitation");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SupabaseUseContext.Provider
      value={{
        channelInvitation,
        activeChannel,
        setActiveChannel,
      }}
    >
      {children}
    </SupabaseUseContext.Provider>
  );
};

export default SupabaseContext;
