// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../utils/database";

interface addresType {
  cep: string;
  street: string;
  number: number;
  state: string;
  district: string;
}

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: ObjectId;
  name: string;
  sexo: string;
  email: string;
  birthDate: string;
  cpf: string;
  rg: string;
  status: string;
  profession: string;
  phone: string;
  convenio: string;
  adress: addresType;
  anamnese: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseType | ErrorResponseType>
): Promise<void> => {
  if (req.method === "GET") {
    const { db } = await connect();
    const { name } = req.query;
    console.log(name);
    const a = name.toString();

    const response: any = await db
      .collection("Medical")
      .find({ $or: [{ name: RegExp(a, "gi") }, { id: name }] })
      .toArray();
    console.log(response);
    res.status(200).json(response);
  } else {
    res.status(400).json({ error: "Error" });
  }
};
