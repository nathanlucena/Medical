// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

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
  if (req.method === "POST") {
    const {
      name,
      sexo,
      email,
      birthDate,
      cpf,
      rg,
      status,
      profession,
      phone,
      convenio,
      adress,
      anamnese,
    } = req.body;
    if (
      !name ||
      !sexo ||
      !email ||
      !birthDate ||
      !cpf ||
      !rg ||
      !status ||
      !profession ||
      !phone ||
      !convenio ||
      !adress
    ) {
      res.status(400).json({ error: "Falta alguma informação" });
      return;
    } else {
      const { db } = await connect();
      const response = await db.collection("Medical").insertOne({
        name,
        sexo,
        email,
        birthDate,
        cpf,
        rg,
        status,
        profession,
        phone,
        convenio,
        adress,
        anamnese,
      });

      res.status(200).json(response.ops[0]);
    }
  } else if (req.method === "PUT") {
    const { cpf, anamnese } = req.body;

    if (!cpf || !anamnese) {
      res.status(400).json({ error: "Missing parameter on request body" });
      return;
    }

    const { db } = await connect();

    await db
      .collection("Medical")
      .updateOne({ cpf: cpf }, { $set: { anamnese: anamnese, upsert: true } });
    res.status(200).json(anamnese);
  } else if (req.method === "DELETE") {
    const { cpf } = req.body;
    const { db } = await connect();
    await db.collection("Medical").deleteOne({ cpf: cpf });
    res.status(200).json(cpf);
  } else {
    res.status(400).json({ error: "Error HTTP" });
  }
};
