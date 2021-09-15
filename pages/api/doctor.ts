// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

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
  if (req.method === "POST") {
    const { name, email, clinicName, specialty, keyAct } = req.body;
    if (!name || !email || !clinicName || !specialty || !keyAct) {
      res.status(400).json({ error: "Falta alguma informação" });
      return;
    } else {
      const { db } = await connect();
      const response = await db.collection("Doctor").insertOne({
        name,
        email,
        clinicName,
        specialty,
        keyAct,
      });

      res.status(200).json(response.ops[0]);
    }
  } else {
    res.status(400).json({ error: "Error" });
  }
};
