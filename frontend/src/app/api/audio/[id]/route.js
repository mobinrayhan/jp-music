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

// Function to handle streaming of audio
export async function GET(request, { params }) {
  const { id } = params;

  // Find the audio by ID from the array
  const audio = audioData.find((item) => item.id === parseInt(id));

  if (!audio) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }

  // Construct the full file path
  const audioFilePath = path.join(process.cwd(), audio.audioUrl);

  try {
    // Check if the file exists
    if (!fs.existsSync(audioFilePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Open a read stream for the audio file
    const audioStream = fs.createReadStream(audioFilePath);

    // Set headers to ensure that the file is streamed and not downloaded
    const headers = {
      "Content-Type": audio.audioType === "MP3" ? "audio/mpeg" : "audio/wav",
      "Content-Disposition": "inline", // Ensures it's streamed, not downloaded
      "Cache-Control": "no-store", // No caching to prevent easy access
      "Content-Transfer-Encoding": "binary",
      "X-Content-Type-Options": "nosniff", // Prevent MIME-type sniffing
    };

    return new NextResponse(audioStream, { headers });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
