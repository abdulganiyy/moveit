import { Schema, model, models } from "mongoose";

const logisticsSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Logistics = models.Logistics || model<any>("Logistics", logisticsSchema);

export default Logistics;
