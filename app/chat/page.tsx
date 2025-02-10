"use client";

import Auth from "@/components/ui/Auth";
import ChatRoom from "@/components/ui/ChatRoom";
import { supabase } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

const ChatPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen">
      {session ? <ChatRoom /> : <Auth />}
    </main>
  );
};

export default ChatPage;
