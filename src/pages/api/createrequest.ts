import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Request from "../../models/Request";
import User from "../../models/User";
import { sendEmail } from "../../lib/mailer";

const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

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

      const data = await Request.create({
        ...req.body,
      });

      //send emails to ncdc
      const users = await User.find({ role: "approver" });

      const emails = users.map((user) => user.email);

      await sendEmail({
        to: [...emails, "devabdulganiyy@gmail.com"],
        subject: "REQUEST FOR APPROVAL",
        html: `<p>Hello Approver,</p>

        <p>A medical Facility with mobile number ${
          data.requesterPhoneNumber
        } has recently submitted a request for the approval of sample transportation.</p>
         
        <p>Request ID: ${data._id}</p>
        
        <p>Date & Time : ${formatter.format(new Date(data.createdAt))}</p>
        
        <p>Product(s) :${data.samples.map((sample) => sample.name).join(", ")}
        
        <p>Kindly access your MOVE IT Dashboard with urgency and attend to the request with ID: ${
          data._id
        }.</p>
        
        <p>Thank You,</p>
        
        <p>The MOVE IT Team!</p>`,
      });

      return res.status(201).json({ status: true, data });
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
