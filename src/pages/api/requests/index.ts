import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Request from "../../../models/Request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    // only get method is accepted
    if (req.method === "GET") {
      const id = req.query.requesterId;

      if (id) {
        const requests = await Request.find({ requesterId: id });

        return res.status(200).json({ status: true, data: requests });
      } else {
        const requests = await Request.find({});

        return res.status(200).json({ status: true, data: requests });
      }
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid only GET Accepted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Connection Failed...!" });
  }
}
