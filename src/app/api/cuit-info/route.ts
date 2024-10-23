import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cuit = searchParams.get("cuit");

  const token = req.headers.get("Authorization");

  if (!cuit || !token) {
    return NextResponse.json(
      { message: "CUIT o token es requerido" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://gateway.app.homo.invertironline.com/business-account/data?cuit=${cuit}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    
    if (error.response) {
      return NextResponse.json(
        error.response.data, 
        { status: error.response.status } 
      );
    } else if (error.request) {
      
      console.error(
        "No se recibió respuesta de la API externa:",
        error.request
      );
      return NextResponse.json(
        { message: "No se recibió respuesta de la API externa" },
        { status: 502 } // Bad Gateway: fallo en la comunicación con la API externa
      );
    } else {
     
      console.error("Error en la solicitud a la API externa:", error.message);
      return NextResponse.json(
        { message: "Error en la solicitud", error: error.message },
        { status: 500 } // Error interno del servidor
      );
    }
  }
}
