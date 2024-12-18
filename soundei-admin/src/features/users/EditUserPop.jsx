import Input from "../../ui/Input";

export default function EditUserPop({ onClose, editableUser }) {
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
        Edit User
      </h1>

      <form
        className="grid grid-cols-4 gap-6 p-6"
        // onSubmit={handleEditFormSubmit}
      >
        <div className="col-start-1 col-end-3">
          <Input
            header={"User Name"}
            placeholder="Changer User Name"
            defaultValue={name}
            name="username"
            id="username"
            required
          />{" "}
        </div>
        <div className="col-start-3 col-end-[-1]">
          <Input
            header={"User Email"}
            placeholder="Change User Email"
            type="email"
            name="email"
            id="email"
          />
        </div>
        {/* <div className="col-start-1 col-end-3">
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
        </div> */}

        {/* <div className="col-start-3 col-end-[-1]">
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
        </div> */}

        {/* for getting id */}
        {/* <input type="hidden" name="audioId" value={_id} /> */}

        <button className="bg-blue-500 p-3 tracking-wider text-white">
          Edit User
        </button>
      </form>
    </section>
  );
}
