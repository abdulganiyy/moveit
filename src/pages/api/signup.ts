import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import { hash } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    // only post method is accepted
    if (req.method === "POST") {
      if (!req.body)
        return res.status(404).json({ error: "Don't have form data...!" });
      const { firstName, lastName, email, password } = req.body;

      // check duplicate users
      const checkexisting = await User.findOne({ email });
      if (checkexisting)
        return res.status(422).json({ message: "User Already Exists...!" });

      // hash password

      const hashedPassword = await hash(password, 12);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        admin: true,
      });

      return res.status(201).json({ status: true, user });
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid only POST Accepted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Connection Failed...!" + error.message });
  }
}
