import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // Obtiene el form-data
    const token = req.headers.get("Authorization"); // Obtiene el token del header

    console.log("Token: ", token);
    // Verifica si se recibió un archivo en el formData
    const file = formData.get("files");
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "No se encontró un archivo válido." },
        { status: 400 }
      );
    }

    // Crea una nueva instancia de FormData para enviarla a la API externa
    const externalFormData = new FormData();

    // Añade los campos al FormData
    externalFormData.append("origin", formData.get("origin") || ""); // Asegura que siempre haya un valor
    externalFormData.append("documentType", formData.get("documentType") || "");
    externalFormData.append("files", file, file.name); // Asegura que se añade el archivo con su nombre

    // Verifica el token
    if (!token) {
      return NextResponse.json(
        { message: "Token no proporcionado." },
        { status: 401 }
      );
    }

    // Realiza la solicitud a la API externa
    const document_req = await axios.post(
      "https://gateway.app.homo.invertironline.com/business-account/documents",
      externalFormData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // Responde con los datos devueltos por la API externa
    return NextResponse.json(document_req.data, { status: 200 });
  } catch (error: any) {
    console.error("Error al subir el archivo:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
