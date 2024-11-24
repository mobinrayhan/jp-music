export const getMimeType = (extension) => {
  const mimeTypes = {
    mp3: "audio/mpeg", // .mp3
    wav: "audio/wav", // .wav
    ogg: "audio/ogg", // .ogg
    flac: "audio/flac", // .flac
    aac: "audio/aac", // .aac
    m4a: "audio/mp4", // .m4a
    zip: "application/zip", // .zip
    jpg: "image/jpeg", // .jpg
    jpeg: "image/jpeg", // .jpeg
    png: "image/png", // .png
    webp: "image/webp", // .webp
  };
  return mimeTypes[extension.toLowerCase()] || null;
};
