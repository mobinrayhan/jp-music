// app/api/audio/[id]/route.js

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Sample audio data
const audioData = [
  {
    id: 1,
    imageUrl: "/image.jpg",
    title: "Sample Audio 1",
    audioUrl: "./private-audios/citicel.mp3",
    audioType: "MP3",
    isDownloaded: true,
    category: "hello-1",
  },
  {
    id: 2,
    imageUrl: "/image.jpg",
    title: "Sample Audio 2",
    audioUrl: "./private-audios/music2.mp3",
    audioType: "WAV",
    isDownloaded: true,
    category: "mobin",
  },
  {
    id: 3,
    imageUrl: "/image.jpg",
    title: "Sample Audio 3",
    audioUrl: "./private-audios/audio3.mp3",
    audioType: "WAV",
    isDownloaded: false,
    category: "hello-3",
  },
];

export async function GET(request) {
  const id = request.url.split("/").pop();
  const audio = audioData.find((item) => item.id === parseInt(id));

  if (!audio) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }

  const audioFilePath = path.join(process.cwd(), audio.audioUrl);

  try {
    if (!fs.existsSync(audioFilePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const stat = fs.statSync(audioFilePath);
    const fileSize = stat.size;

    const range = request.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const audioStream = fs.createReadStream(audioFilePath, { start, end });

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": audio.audioType === "MP3" ? "audio/mpeg" : "audio/wav",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      };

      return new NextResponse(audioStream, { status: 206, headers });
    } else {
      const audioStream = fs.createReadStream(audioFilePath);

      const headers = {
        "Content-Length": fileSize,
        "Content-Type": audio.audioType === "MP3" ? "audio/mpeg" : "audio/wav",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      };

      return new NextResponse(audioStream, { headers });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
