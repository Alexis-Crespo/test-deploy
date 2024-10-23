import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("este es el body que le llega al back", body);

  try {
    const register_req = await axios.post(
      "https://gateway.app.homo.invertironline.com/business-account/register",
      body
    );
    return NextResponse.json(register_req.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
