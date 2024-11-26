import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { formatFileSize } from "../../utils/formatFileSize";

export default function ListOfPreparedAudio({
  files,
  extractedFiles,
  category,
}) {
  const exportToExcel = () => {
    const filesArr =
      (extractedFiles.length && extractedFiles) || (files.length && files);

    if (!filesArr || !filesArr.length) {
      toast.error("No Audios Provided!");
      return;
    }

    if (!category) {
      toast.error("No Category Selected!");
      return;
    }

    const jsonData = filesArr.map((file) => {
      return {
        id: file.name,
        name: file.name.replace(/\.[^/.]+$/, ""),
        keywords: "",
        category: category,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(
      blob,
      `audio_metadata_category-${category}-totalAudio-${filesArr.length}.xlsx`,
    );
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between py-5">
        <h3 className="text-2xl font-medium tracking-wider text-gray-800">
          Files to Upload
        </h3>

        <button
          className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
          onClick={exportToExcel}
        >
          Download Metadata
        </button>
      </div>

      <div className="max-h-[55vh] overflow-y-auto p-4 shadow-inner">
        <ul className="mt-2 space-y-5 text-sm text-gray-600">
          {files.map((file, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{file.name}</span>
              <span>{(file.size / 1024).toFixed(2)} KB</span>
            </li>
          ))}
          {extractedFiles.map((file, idx) => (
            <li key={idx + files.length} className="flex justify-between">
              <span>{file.name}</span>
              <span>{formatFileSize(file.blob.size)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
