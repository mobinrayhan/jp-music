import Select from "react-select";
import Input from "../../ui/Input";
import { categoryOptions } from "./UploadAudiosForm";

export default function EditAudioPopup({ editableAudio, onClose }) {
  const { category, keywords, name, _id } = editableAudio;
  const defaultCategory = categoryOptions.find((cat) => cat.value === category);

  function handleEditFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const audioName = formData.get("audioName");
    const keywords = formData.get("keywords");
    const category = formData.get("category");

    console.log({ audioName, keywords, category });
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
            name="audioName"
            id="audioName"
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
        <div className="col-start-1 col-end-[-1]">
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

        <button className="bg-blue-500 p-3 tracking-wider text-white">
          Edit Audio
        </button>
      </form>
    </section>
  );
}
