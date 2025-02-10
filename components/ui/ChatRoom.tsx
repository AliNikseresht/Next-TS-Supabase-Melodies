"use client";

import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabaseClient";

type Message = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [session, setSession] = useState<Session | null>(null);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//   };

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

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data);
      }
    };

    fetchMessages();

    // **Real-time Updates**
    const subscription = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages, payload.new as Message];
            return newMessages;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !session) return;

    const { error } = await supabase.from("messages").insert([
      {
        user_id: session.user.id,
        content: newMessage,
      },
    ]);

    if (!error) {
      setNewMessage("");
    }
  };

  return (
    <div className="mx-auto p-4 w-full h-full flex flex-col justify-center">
      <div
        className="h-full overflow-y-auto mb-4 p-2"
        id="chatContainer"
      >
        {messages.map((msg, index) => (
          <div
            key={`${msg.id}-${index}`}
            className={`p-3 flex ${
              msg.user_id === session?.user.id ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col">
              <div
                className={`p-3 rounded-md flex flex-col ${
                  msg.user_id === session?.user.id
                    ? "bg-yellow-600 text-[#ffff]"
                    : "text-[#212121] bg-gray-300"
                }`}
              >
                <strong className="border-b border-[#000] py-1">
                  {msg.user_id}
                </strong>
                <span> {msg.content}</span>
              </div>
              <span>{msg.created_at}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Geben Sie eine Nachricht ein..."
          className="flex-1 p-2 border rounded-md bg-transparent border-yellow-600"
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-600 text-white px-4 py-2 rounded-md"
        >
          Schicken
        </button>
      </div>
      {/* <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Ausfahrt
      </button> */}
    </div>
  );
}
