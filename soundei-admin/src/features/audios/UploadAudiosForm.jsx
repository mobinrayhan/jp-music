import JSZip from "jszip";
import { useState } from "react";
import ListOfPreparedAudio from "./ListOfPreparedAudio";

export default function UploadAudiosForm() {
  const [files, setFiles] = useState([]); // State for files
  const [extractedFiles, setExtractedFiles] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;
    const fileList = Array.from(selectedFiles);

    const zipFiles = fileList.filter((file) => file.type === "application/zip");
    if (zipFiles.length) {
      const zip = new JSZip();
      const zipFile = zipFiles[0]; // Assuming one zip file at a time
      const content = await zip.loadAsync(zipFile);
      const extracted = [];

      for (const filename in content.files) {
        const file = content.files[filename];
        if (!file.dir) {
          const fileContent = await file.async("blob");
          const fileNameOnly = filename.split("/").pop(); // Extract only the file name
          extracted.push({ name: fileNameOnly, blob: fileContent });

          if (!extracted.some((f) => f.name === fileNameOnly)) {
            extracted.push({ name: fileNameOnly, blob: fileContent });
          }
        }
      }

      setExtractedFiles(extracted);
    }

    const nonZipFiles = fileList.filter(
      (file) => file.type !== "application/zip",
    );
    setFiles(nonZipFiles);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!files.length && !extractedFiles.length) {
      alert("No files to upload.");
      return;
    }

    // Upload non-ZIP files
    // files.forEach((file) => uploadMutation.mutate(file));

    // Upload extracted ZIP files
    extractedFiles.forEach((file) => {
      const fileBlob = new File([file.blob], file.name);
      // uploadMutation.mutate(fileBlob);
    });
  };

  return (
    <div className="container mx-auto rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Upload Audio or ZIP File
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="fileUpload"
          >
            Upload File
          </label>
          <input
            type="file"
            id="fileUpload"
            accept=".mp3,.wav,.ogg,.flac,.aac,.m4a,.zip"
            multiple
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={handleFileChange}
          />
          <p className="mt-2 text-xs text-gray-500">
            You can upload a single audio (.mp3, .wav, .ogg, .flac, .aac, .m4a,)
            or a ZIP file containing multiple audios.
          </p>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          Upload
        </button>
      </form>

      {extractedFiles.length ? (
        <ListOfPreparedAudio extractedFiles={extractedFiles} files={files} />
      ) : (
        ""
      )}
    </div>
  );
}
