import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Link className="border border-yellow-600 rounded-md px-5 py-2 text-yellow-600" href="/chat">Go Chatroom</Link>
    </div>
  );
};

export default HomePage;
