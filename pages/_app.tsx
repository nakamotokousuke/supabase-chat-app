import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SupabaseContext from "../function/supabaseContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <SupabaseContext>
          <Component {...pageProps} />
        </SupabaseContext>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}
