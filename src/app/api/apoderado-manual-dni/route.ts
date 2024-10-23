import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("este es el body que le llega al back", body);

  try {
    const register_req = await axios.post(
      "https://gateway.app.homo.invertironline.com/business-representative/manual-dni",
      body
    );
    return NextResponse.json(register_req.data, { status: 200 });
  } catch (error: any) {
    // Aquí nos aseguramos de devolver el error exacto de la API externa
    if (error.response) {
      console.error("Error de API externa:", error.response?.data);

      return NextResponse.json(
        {
          message: "Error from external API",
          status: error.response.status,
          data: error.response.data,
        },
        { status: error.response.status }
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      return NextResponse.json(
        {
          message: "No response received from external API",
          error: error.request,
        },
        { status: 500 }
      );
    } else {
      // Otro tipo de error
      return NextResponse.json(
        { message: "Error in making request", error: error.message },
        { status: 500 }
      );
    }
  }
}
