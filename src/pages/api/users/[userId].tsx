import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const id = req.query.userId;

      const user = await User.findById(id);

      return res.status(200).json({ status: true, data: user });
    } else if (req.method === "PATCH") {
      const id = req.query.userId;

      const user = await User.findByIdAndUpdate(
        id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(200).json({ status: true, data: user });
    } else if (req.method === "DELETE") {
      const id = req.query.userId;

      await User.findByIdAndDelete(id);

      return res.status(204).json({ status: true });
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
