// import { Inter } from "@next/font/google";
import SetUrl from "../components/SetUrl";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <div className="">
        <div className="text-3xl font-semibold mb-8">Youtube Video To MP3</div>
        <div className="border border-gray-700 rounded-lg bg-black p-4 min-w-[60rem]">
          <SetUrl />
        </div>
      </div>
    </main>
  );
}
