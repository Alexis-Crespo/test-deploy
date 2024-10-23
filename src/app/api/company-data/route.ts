import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = req.headers.get("authorization");
  console.log("este es el body que le llega al back", body);
  console.log("Con este token: ", token);

  try {
    const register_req = await axios.post(
      "https://gateway.app.homo.invertironline.com/business-account/data",
      body,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return NextResponse.json(register_req.data, { status: 200 });
  } catch (error: any) {
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
