// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const url = body.url;

  const info = await ytdl.getInfo(url);

  let title = info.videoDetails.title;

  title = title.replace(" ", "_");

  res.status(200).json(title);
}
