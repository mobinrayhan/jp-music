import { formatFileSize } from "../../utils/formatFileSize";

export default function ListOfPreparedAudio({ files, extractedFiles }) {
  return (
    <div className="mt-6">
      <h3 className="py-6 text-2xl font-medium tracking-wider text-gray-800">
        Files to Upload
      </h3>

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
