import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Request from "../../../models/Request";
import User from "../../../models/User";
import { sendEmail } from "../../../lib/mailer";

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

    if (req.method === "PATCH") {
      const id = req.query.requestId;
      const role = req.query.role;
      const action = req.query.action;

      const {
        status,
        fullName,
        userId,
        personelId,
        personelFullName,
        comment,
        company,
        size,
        email,
      } = req.body;

      const request = await await Request.findById(id);

      // console.log(id, role);

      // return res.status(200).json({ status: true, data: "updated" });

      if (action === "size") {
        await Request.findByIdAndUpdate(id, {
          size,
        });

        return res.status(200).json({ status: "success" });
      }

      if (role === "approver") {
        const data = await Request.findByIdAndUpdate(
          id,
          {
            status,
            approver: {
              status,
              fullName,
              date: new Date(),
              userId,
              comment,
              email,
            },
          },
          { new: true }
        );

        // if (status === "approved") {
        //   transporter.sendMail({
        //     from: "demo@moveit.com",
        //     to: "devabdulganiyy@gmail.com",
        //     subject: `Message From moveit`,
        //     text: `You have awaiting requests pending assignment`,
        //   });
        // }

        //send emails to logistics
        const users = await User.find({ role: "logistics" });

        const regionerLogistics = users.filter((user) =>
          user.zones.includes(request.zone)
        );
        const emails = regionerLogistics.map((user) => user.email);

        await sendEmail({
          to: [...emails, "devabdulganiyy@gmail.com"],
          subject: " APPROVED REQUEST FOR PICKUP",
          html: `<p>Hello Logistics Team,</p>

          <p>A recently submitted request has been approved for pickup </p>
           
          <p>Request ID: ${data._id}</p>
          
          <p>Date & Time Requested : ${formatter.format(
            new Date(data.createdAt)
          )}</p>

          <p>Date & Time Approved : ${formatter.format(
            new Date(data.approver?.date)
          )}</p>
          
          <p>Product(s) :${data.samples.map((sample) => sample.name).join(", ")}
          </p>
          
          <p>Kindly access your MOVE IT Dashboard with urgency and attend to the request with ID: ${
            data._id
          }.</p>
          
          <p>Thank You,</p>
          
          <p>The MOVE IT Team!</p>`,
        });

        return res.status(200).json({ status: "success" });
      }

      if (role === "logistics") {
        if (status === "assigned") {
          const data = await Request.findByIdAndUpdate(
            id,
            {
              status,
              logistics: {
                status,
                fullName,
                date: new Date(),
                userId,
                comment,
                company,
              },
              picker: {
                userId: personelId,
                fullName: personelFullName,
                email,
              },
            },
            { new: true }
          );

          const user = await User.findOne({ email });

          await sendEmail({
            to: [user.email, "devabdulganiyy@gmail.com"],
            subject: "New Request Awaiting Pickup",
            html: `<p>Hello Personnel,</p>

            <p>A request with Request ID: 0447882 has been assigned to you for pickup</p>
             
            <p>Request ID: ${request._id}</p>
            
            <p>Date & Time Assigned : ${formatter.format(
              new Date(data.logistics?.date)
            )}</p>
  
            <p>Product(s) :${request.samples
              .map((sample) => sample.name)
              .join(", ")}
            </p>
            
            <p>Kindly access your MOVE IT Dashboard with urgency and attend to the request with ID: ${
              request._id
            }.</p>
            
            <p>Thank You,</p>
            
            <p>The MOVE IT Team!</p>`,
          });

          return res.status(200).json({ status: "success" });
        }
      }

      if (role === "picker") {
        if (status === "intransit") {
          const data = await Request.findByIdAndUpdate(
            id,
            {
              status,
              picker: {
                status,
                fullName,
                date: new Date(),
                userId,
                comment,
              },
              dropper: {
                userId: personelId,
                fullName: personelFullName,
                email,
              },
            },
            { new: true }
          );

          const user = await User.findOne({ email });

          await sendEmail({
            to: [user.email, "devabdulganiyy@gmail.com"],
            subject: "New Request Awaiting Drop off",
            html: `<p>Hello drop off Personnel,</p>

            <p>A request with Request ID: 0447882 has been assigned to you for drop off</p>
             
            <p>Request ID: ${request._id}</p>
            
            <p>Date & Time picked  up: ${formatter.format(
              new Date(data.picker?.date)
            )}</p>
  
            <p>Product(s) :${request.samples
              .map((sample) => sample.name)
              .join(", ")}
            </p>
            
            <p>Kindly access your MOVE IT Dashboard with urgency and attend to the request with ID: ${
              request._id
            }.</p>
            
            <p>Thank You,</p>
            
            <p>The MOVE IT Team!</p>`,
          });

          return res.status(200).json({ status: "success" });
        }

        if (status === "rejected") {
          await Request.findByIdAndUpdate(id, {
            status,
          });

          return res.status(200).json({ status: "success" });
        }
      }

      if (role === "dropper") {
        if (status === "completed") {
          const data = await Request.findByIdAndUpdate(
            id,
            {
              status,
              dropper: {
                status,
                fullName,
                date: new Date(),
                userId,
                comment,
              },
            },
            { new: true }
          );

          await sendEmail({
            to: [request.email, "devabdulganiyy@gmail.com"],
            subject: "Request Completed",
            html: `<p>Hello Team,</>
            
            <p>Your request with Request ID: ${
              request._id
            } has been delivered successfully</>

            <p>Date & Time delivered: ${formatter.format(
              new Date(data.dropper?.date)
            )}</p>

            <p>Thank You,</p>
            
            <p>The MOVE IT Team!</p>
            `,
          });

          return res.status(200).json({ status: "success" });
        }
      }
    }

    if (req.method === "GET") {
      // only get method is accepted
      const id = req.query.requestId;

      const request = await Request.findById(id);

      return res.status(200).json({ status: true, data: request });
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
