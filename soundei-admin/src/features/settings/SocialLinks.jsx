import LogoInput from "./LogoInput";
import useUpdateWebSettings from "./useUpdateWebSettings";

export default function SocialLinks() {
  const { isPending, mutate: updateSettingsFn } = useUpdateWebSettings();

  function handleSocialSubmit(eve) {
    eve.preventDefault();

    const formEle = eve.currentTarget;
    const formData = new FormData(formEle);

    const facebook = formData.get("facebook");
    const instagram = formData.get("instagram");
    const twitter = formData.get("twitter");
    const logo = formData.get("logo");

    updateSettingsFn(
      { facebook, instagram, twitter, logo },
      {
        onSuccess: () => {
          formEle.reset();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSocialSubmit}>
      <LogoInput isPending={isPending} />

      <h3 className="my-6 text-center text-xl tracking-wider">Social Links</h3>
      <div className="mb-6">
        <label
          htmlFor="facebook"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Facebook URL
        </label>
        <input
          disabled={isPending}
          type="url"
          id="facebook"
          name="facebook"
          placeholder="https://facebook.com/yourpage"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        />
      </div>

      <div className="mb-6">
        <label
          disabled={isPending}
          htmlFor="instagram"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Instagram
        </label>
        <input
          disabled={isPending}
          type="url"
          id="instagram"
          name="instagram"
          placeholder="https://instagram.com/yourprofile"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="twitter"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Twitter URL
        </label>
        <input
          disabled={isPending}
          type="url"
          id="twitter"
          name="twitter"
          placeholder="https://twitter.com/yourprofile"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isPending}
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
