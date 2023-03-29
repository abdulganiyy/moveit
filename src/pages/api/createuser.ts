import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import { hash } from "bcryptjs";
import { sendEmail } from "../../lib/mailer";

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
      const { firstName, lastName, email, password, ...rest } = req.body;

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
        admin: false,
        ...rest,
      });

      if (user.role === "approver") {
        await sendEmail({
          to: user.email,
          subject: "Password Reset",
          html: `      
          <p>Congratulations! You have been granted the NCDC Approver role on MOVEIT.
           Additionally, to reset your password, simply click or copy the provided link below.</p>
          
          <p>http${process.env.NODE_ENV === "production" ? "s" : ""}://${
            req.headers.host
          }/reset-password?email=${user.email}</p>`,
        });
      }

      if (user.role === "requester") {
        await sendEmail({
          to: user.email,
          subject: "Password Reset",
          html: `      
            <p>Congratulations! You have been granted the NCDC Requester role on MOVEIT.
             Additionally, to reset your password, simply click or copy the provided link below.</p>
            
            <p>http${process.env.NODE_ENV === "production" ? "s" : ""}://${
            req.headers.host
          }/reset-password?email=${user.email}</p>`,
        });
      }

      if (user.role === "logistics") {
        await sendEmail({
          to: user.email,
          subject: "Password Reset",
          html: `      
            <p>Congratulations! You have been granted the NCDC Logistics role on MOVEIT.
             Additionally, to reset your password, simply click or copy the provided link below.</p>
            
            <p>http${process.env.NODE_ENV === "production" ? "s" : ""}://${
            req.headers.host
          }/reset-password?email=${user.email}</p>`,
        });
      }

      if (user.role === "pickup-personel") {
        await sendEmail({
          to: user.email,
          subject: "Password Reset",
          html: `      
            <p>Congratulations! You have been granted the NCDC pickup personel role on MOVEIT.
             Additionally, to reset your password, simply click or copy the provided link below.</p>
            
            <p>http${process.env.NODE_ENV === "production" ? "s" : ""}://${
            req.headers.host
          }/reset-password?email=${user.email}</p>`,
        });
      }
      if (user.role === "dropoff-personel") {
        await sendEmail({
          to: user.email,
          subject: "Password Reset",
          html: `      
            <p>Congratulations! You have been granted the NCDC NCDC dropoff personel role on MOVEIT.
             Additionally, to reset your password, simply click or copy the provided link below.</p>
            
            <p>http${process.env.NODE_ENV === "production" ? "s" : ""}://${
            req.headers.host
          }/reset-password?email=${user.email}</p>`,
        });
      }

      return res.status(201).json({ status: true, user });
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid only POST Accepted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Connection Failed...!" });
  }
}
