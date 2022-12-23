"use client";

import { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SetUrl() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitUrl = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    if (url.trim() !== "") {
      e.preventDefault();
      const download = await fetch("/api/download", {
        method: "POST",
        body: JSON.stringify({ url: url }),
      });

      const data = await fetch("/api/download/info", {
        method: "POST",
        body: JSON.stringify({ url: url }),
      });
      const fileInfo = await data.json();
      console.log(fileInfo);

      const fileBlob = await (await download).blob();
      // once we have the file buffer BLOB from the post request we simply need to send a GET request to retrieve the file data
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(fileBlob);
      link.download = fileInfo;
      link.click();
      link.remove();
    }
    setLoading(false);
  };

  return (
    <div className="w-[80%] mx-auto py-6">
      <form onSubmit={(e) => submitUrl(e)} className="flex flex-col">
        <label
          htmlFor="url"
          className="text-xl font-semibold text-gray-100 mb-2"
        >
          Youtube video URL <span className="text-red-600">*</span>
        </label>
        <input
          id="url"
          className="bg-[#111111] py-2 px-4 rounded-lg outline outline-1 outline-gray-600 focus:outline-white transition"
          placeholder="https://www.youtube.com"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          disabled={loading || url.trim() === ""}
          className={`${
            loading || url.trim() === ""
              ? "text-zinc-500 bg-zinc-800/80 "
              : " hover:bg-transparent hover:text-white text-black bg-zinc-100  border-white"
          } w-[15%] mx-auto mt-10 flex justify-center items-center rounded-lg border py-2 font-semibold transition disabled:cursor-not-allowed disabled:border-zinc-600 `}
          type={"submit"}
        >
          {loading ? (
            <div className="py-1">
              <AiOutlineLoading3Quarters className=" animate-spin text-zinc-500" />
            </div>
          ) : (
            "Download"
          )}
        </button>
      </form>
    </div>
  );
}
