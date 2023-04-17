// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../lib/mailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await sendEmail({
      to: "devabdulganiyy@gmail.com",
      subject: "Welcome to Moveit",
      html: `<p>Hello</> https://${req.headers.host}`,
    });

    // console.log(req.headers.host);

    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
