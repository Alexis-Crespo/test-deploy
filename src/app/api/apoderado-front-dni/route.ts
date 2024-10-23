import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  try {
    // Realizar la petición POST a la API externa con el archivo adjunto
    const register_req = await axios.post(
      "https://gateway.app.homo.invertironline.com/business-representative/validate-front-dni",
      formData
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
      return NextResponse.json(
        {
          message: "No response received from external API",
          error: error.request,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Error in making request", error: error.message },
        { status: 500 }
      );
    }
  }
}
