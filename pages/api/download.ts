// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const config = {
  api: {
    responseLimit: false,
  },
};

import ytdl from "ytdl-core";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const url = body.url;
  try {
    ytdl(url, { filter: "audioonly" }).pipe(res);
  } catch (error) {
    res.status(500).json(error);
  }
}
