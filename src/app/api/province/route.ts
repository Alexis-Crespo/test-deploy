import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization");

  const { searchParams } = req.nextUrl;
  const nationalityId = searchParams.get("nationalityId");
  console.log("Llego la peticion con el nationalityId: ", nationalityId);
  if (!token) {
    return NextResponse.json(
      { message: "token es requerido" },
      { status: 400 }
    );
  }

  try {
    console.log(
      `La url quedo: https://gateway.app.homo.invertironline.com/geolocation/states/${nationalityId}`
    );
    const response = await axios.get(
      `https://gateway.app.homo.invertironline.com/geolocation/states/${nationalityId}`,
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
