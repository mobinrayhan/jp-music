import toast from "react-hot-toast";
import Select from "react-select";
import Input from "../../ui/Input";
import { categoryOptions } from "./UploadAudiosForm";
import useEditAudio from "./useEditAudio";

export default function EditAudioPopup({ editableAudio, onClose }) {
  const { editAudioFn } = useEditAudio();
  const { category, keywords, name, _id } = editableAudio;
  const defaultCategory = categoryOptions.find((cat) => cat.value === category);

  function handleEditFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    editAudioFn(formData, {
      onSuccess: (audio) => {
        toast.success(audio.data?.message || "Audio Updated Successfully!");
        onClose();
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong!");
      },
    });
  }

  return (
    <section className="absolute left-1/2 top-1/2 z-10 w-[50rem] -translate-x-1/2 -translate-y-1/2 bg-white">
      <div className="relative p-4">
        <button
          onClick={onClose}
          className="absolute right-[3%] cursor-pointer border border-slate-200 px-2 py-1 text-2xl"
        >
          &#x2715;
        </button>
      </div>

      <h1 className="text-center text-3xl font-semibold tracking-wider">
        Edit Audio
      </h1>

      <form
        className="grid grid-cols-4 gap-6 p-6"
        onSubmit={handleEditFormSubmit}
      >
        <div className="col-start-1 col-end-3">
          <Input
            header={"Edit Audio Name"}
            placeholder="Changer Your Audio Name"
            defaultValue={name}
            name="name"
            id="name"
            required
          />{" "}
        </div>
        <div className="col-start-3 col-end-[-1]">
          <Input
            header={"Edit Audio Keywords"}
            placeholder="Changer Your Audio Keywords"
            defaultValue={keywords}
            name="keywords"
            id="keywords"
          />
        </div>
        <div className="col-start-1 col-end-3">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="category"
          >
            Category
          </label>
          <Select
            required
            options={categoryOptions}
            defaultValue={defaultCategory}
            name="category"
          />
        </div>

        <div className="col-start-3 col-end-[-1]">
          <Input
            type="file"
            id="file"
            name="file"
            // disabled={isPending}
            accept=".mp3,.wav,.ogg,.flac,.aac,.m4a"
            header={"Select New  Audio!"}
            // onChange={handleFileChange}
            instruction={"You can upload (.mp3, .wav, .ogg, .flac, .aac, .m4a)"}
          />
        </div>

        {/* for getting id */}
        <input type="hidden" name="audioId" value={_id} />

        <button className="bg-blue-500 p-3 tracking-wider text-white">
          Edit Audio
        </button>
      </form>
    </section>
  );
}
