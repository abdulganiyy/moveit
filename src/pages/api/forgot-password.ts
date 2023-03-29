// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import { sendEmail } from "../../lib/mailer";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;
  try {
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await sendEmail({
        to: email,
        subject: "Password Reset",
        html: `
        <p>Click or copy the link below to reset your password</p>
        
        <p>http${process.env.NODE_ENV === "production" ? "s" : ""}://${
          req.headers.host
        }/reset-password?email=${email}</p>`,
      });

      return res.status(200).json({ status: "Success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
