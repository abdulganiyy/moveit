// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../lib/mailer";
import User from "@/models/User";
import { hash } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const hashedPassword = await hash(password, 12);

      await User.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
        }
      );

      res.status(200).json({ status: "Success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
