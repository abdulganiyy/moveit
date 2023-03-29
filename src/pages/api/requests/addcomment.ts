import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Request from "../../../models/Request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    if (req.method === "PATCH") {
      const role = req.query.role;
      const id = req.query.id;
      const { comment } = req.body;

      // console.log(id, role, comment);

      if (role === "approver") {
        await Request.findByIdAndUpdate(id, {
          $push: { approverComments: comment },
        });

        return res.status(200).json({ status: "success" });
      }

      if (role === "logistics") {
        await Request.findByIdAndUpdate(id, {
          $push: { logisticsComments: comment },
        });

        return res.status(200).json({ status: "success" });
      }

      if (role === "personel") {
        await Request.findByIdAndUpdate(id, {
          $push: { personelComments: comment },
        });

        return res.status(200).json({ status: "success" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Connection Failed...!" });
  }
}
