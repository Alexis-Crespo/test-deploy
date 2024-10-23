import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { beneficiaryId } = await req.json(); // Obtén el beneficiaryId desde el cuerpo de la solicitud
    const token = req.headers.get("authorization");

    console.log(
      "Beneficiary ID en el backend:",
      beneficiaryId,
      "Token:",
      token
    );

    const register_req = await axios.delete(
      `https://gateway.app.homo.invertironline.com/business-beneficiary/${beneficiaryId}`,
      {
        headers: {
          Authorization: token, // Agrega el token al header de la solicitud
        },
      }
    );

    return NextResponse.json(register_req.data, { status: 200 });
  } catch (error) {
    console.error("Error en el backend:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
