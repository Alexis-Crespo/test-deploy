import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      { message: "CUIT o token es requerido" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://gateway.app.homo.invertironline.com/government-data/activities`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los datos:", error);

    return NextResponse.json(
      { message: "Error al obtener los datos", error: error.message },
      { status: 500 }
    );
  }
}