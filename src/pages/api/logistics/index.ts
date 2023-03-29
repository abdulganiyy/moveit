import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Logistics from "../../../models/Logistcs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const { name } = req.body;

      if (await Logistics.findOne({ name })) {
        res.status(400).json({ error: "Logistics company already exists" });
      } else {
        const logistics = await Logistics.create({ name: name.trim() });

        res.status(201).json({ data: logistics });
      }
    }

    if (req.method === "GET") {
      const logisticsList = await Logistics.find();
      res.status(200).json({ data: logisticsList });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Connection Failed...!" });
  }
}
