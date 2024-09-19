// app/api/audio/[file]/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Simulate authentication (replace with real auth logic)
const isAuthenticated = (req) => {
  return true;
};

export async function GET(req, { params }) {
  // const { file } = params;
  console.log(params);
  const file = "citicel.mp3";

  if (!isAuthenticated(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const filePath = path.resolve(`./private-audios/${file}`);

  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath);
    return new Response(fileStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename=${file}`,
      },
    });
  } else {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}
