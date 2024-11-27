import JSZip from "jszip";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import * as XLSX from "xlsx";
import { categoryList } from "../../utils/category-list";
import { getMimeType } from "../../utils/getMimeType";
import ListOfPreparedAudio from "./ListOfPreparedAudio";
import MetadataTable from "./MetadataTable";
import useAudiosUpload from "./useAudiosUpload";

const categoryOptions = categoryList
  .map((catItem) => {
    return (
      catItem.category !== "all" && {
        label:
          catItem.category.charAt(0).toUpperCase() + catItem.category.slice(1),
        value: catItem.category,
      }
    );
  })
  .filter(Boolean)
  .sort((a, b) => a.label.localeCompare(b.label));

export default function UploadAudiosForm() {
  const [files, setFiles] = useState([]); // State for selected files
  const [extractedFiles, setExtractedFiles] = useState([]); // State for extracted files from ZIP
  const { uploadFileMutation, isPending } = useAudiosUpload();
  const [category, setCategory] = useState("");
  const [extractedJsonMetadata, setExtractedJsonMetadata] = useState([]);

  const defaultCategory = categoryOptions.find(
    (cat) => cat.value === extractedJsonMetadata?.[0]?.category,
  );
  const uploadedAudioFiles =
    (files.length && files) || (extractedFiles.length && extractedFiles);

  const isDisabledMetadata =
    isPending || !uploadedAudioFiles || uploadedAudioFiles.length === 1;

  // Handle file selection
  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;
    const fileList = Array.from(selectedFiles);

    const zipFiles = fileList.filter((file) => file.type === "application/zip");
    if (zipFiles.length) {
      const zip = new JSZip();
      const zipFile = zipFiles[0]; // Assuming one ZIP file at a time
      const content = await zip.loadAsync(zipFile);
      const extracted = [];

      for (const filename in content.files) {
        const file = content.files[filename];
        if (!file.dir) {
          const fileContent = await file.async("blob");
          const fileNameOnly = filename.split("/").pop(); // Extract only the file name
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

  useEffect(() => {
    // Add the beforeunload event listener if pending
    const handleBeforeUnload = (e) => {
      if (isPending) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    if (isPending) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPending]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!files.length && !extractedFiles.length) {
      toast.error("No Audio Provided !!");
      return;
    }

    const formData = new FormData(event.target);
    const category = formData.get("category");

    if (!category) {
      toast.error("No Category Selected!!");
      return;
    }
    const isLengthSame =
      extractedJsonMetadata.length === uploadedAudioFiles.length;

    if (!isLengthSame && uploadedAudioFiles.length <= 1) {
      toast.error(
        `You wanna upload ${uploadedAudioFiles.length} audios but your metadata listed ${extractedJsonMetadata.length} audios data!`,
      );
      return;
    }

    const isMatchedCategory = extractedJsonMetadata.every(
      (audio) => audio.category === category,
    );

    if (!isMatchedCategory && uploadedAudioFiles.length <= 1) {
      toast.error("Category is not matched with metadata!");
      return;
    }

    let matchCount = 0;
    let nonMatchCount = 0;

    uploadedAudioFiles.forEach((upAudio) => {
      const isMatch = extractedJsonMetadata.some((metaData) => {
        return metaData.id === upAudio.name;
      });
      if (isMatch) {
        matchCount++;
      } else {
        nonMatchCount++;
      }
    });

    if (nonMatchCount && uploadedAudioFiles.length <= 1) {
      toast.error(`Matches: ${matchCount}, Non-Matches: ${nonMatchCount}`);
      return;
    }

    const name = formData.get("name");
    const keywords = formData.get("keywords");

    const metadata =
      uploadedAudioFiles.length <= 1
        ? extractedJsonMetadata.map((data) => {
            return {
              id: data.id,
              name: data.name,
              keywords: data.keywords,
            };
          })
        : { id: uploadedAudioFiles[0].name, name, keywords: keywords };

    // Upload non-ZIP files
    // files.forEach((file) => uploadFileMutation.mutate(file));
    if (files.length) {
      uploadFileMutation(
        { files, category, metadata },
        {
          onSuccess: () => {
            event.target.reset();
            setFiles([]);
            setExtractedJsonMetadata([]);
          },
        },
      );
    }

    // Upload extracted ZIP files
    const extractedFilesWithType = extractedFiles.map((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const mimeType = getMimeType(fileExtension);
      const fileBlob = new File([file.blob], file.name, { type: mimeType });
      return fileBlob;
    });

    if (extractedFilesWithType.length) {
      uploadFileMutation(
        { files: extractedFilesWithType, category, metadata },
        {
          onSuccess: () => {
            event.target.reset();
            setExtractedFiles([]);
            setExtractedJsonMetadata([]);
          },
        },
      );
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // Read the file as a binary string
    reader.onload = (e) => {
      const binaryStr = e.target.result;

      // Parse the file using XLSX
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet name
      const worksheet = workbook.Sheets[sheetName]; // Get the first worksheet

      // Convert sheet to JSON
      const data = XLSX.utils.sheet_to_json(worksheet);

      // Trim all string fields in the JSON data
      const trimmedData = data.map((row) =>
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [
            key,
            typeof value === "string" ? value.trim() : value,
          ]),
        ),
      );

      setExtractedJsonMetadata(trimmedData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <section className="container mx-auto rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Upload Audio or ZIP File
      </h2>

      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${isPending ? "is-pending" : ""}`}
      >
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
            disabled={isPending}
            multiple
            accept=".mp3,.wav,.ogg,.flac,.aac,.m4a,.zip"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={handleFileChange}
          />
          <p className="mt-2 text-xs text-gray-500">
            You can upload (.mp3, .wav, .ogg, .flac, .aac, .m4a) or a ZIP file
            containing multiple audios.
          </p>
        </div>

        <div>
          {uploadedAudioFiles.length === 1 ? (
            <>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="keywords"
              >
                Enter keywords
              </label>
              <input
                required
                type="input"
                id="keywords"
                name="keywords"
                disabled={isPending}
                placeholder="Enter Audio File Keyword!"
                className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              <p className="mt-2 text-xs text-gray-500">
                You can write like this (james, korobi, mobin) format!
              </p>
            </>
          ) : (
            <>
              {" "}
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="metadata"
              >
                Upload Metadata
              </label>
              <input
                required
                type="file"
                id="metadata"
                disabled={isDisabledMetadata}
                accept=".xlsx"
                className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                onChange={handleFileUpload}
              />
              <p className="mt-2 text-xs text-gray-500">
                You can upload (.xlsx) file format!
              </p>
            </>
          )}
        </div>

        {uploadedAudioFiles.length === 1 ? (
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Enter Audio Name
            </label>
            <input
              required
              type="input"
              id="name"
              name="name"
              disabled={isPending}
              defaultValue={uploadedAudioFiles[0].name.replace(/\.[^/.]+$/, "")}
              placeholder="Enter Audio Name!"
              className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
          </div>
        ) : null}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="category"
          >
            Category
          </label>
          <Select
            isDisabled={isPending}
            required
            key={defaultCategory?.value}
            defaultValue={defaultCategory}
            options={categoryOptions}
            id="category"
            name="category"
            onChange={(eve) => setCategory(eve.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full self-end rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          {isPending ? "Uploading..." : "Upload"}
        </button>
      </form>

      {!extractedJsonMetadata.length && uploadedAudioFiles.length > 1 ? (
        <ListOfPreparedAudio
          extractedFiles={extractedFiles}
          files={files}
          category={category}
        />
      ) : (
        ""
      )}

      {extractedJsonMetadata.length ? (
        <MetadataTable extractedJsonMetadata={extractedJsonMetadata} />
      ) : (
        ""
      )}
    </section>
  );
}
