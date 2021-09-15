// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../utils/database";

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: ObjectId;
  name: string;
  email: string;
  clinicName: string;
  specialty: string;
  keyAct: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseType | ErrorResponseType>
): Promise<void> => {
  if (req.method === "GET") {
    const { db } = await connect();
    const { key } = req.query;
    const keyString = key.toString();
    const response: any = await db
      .collection("Doctor")
      .findOne({ keyAct: keyString });
    console.log(key);
    res.status(200).json(response);
  } else {
    res.status(400).json({ error: "Error" });
  }
};
