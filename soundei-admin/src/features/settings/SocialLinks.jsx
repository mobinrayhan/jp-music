import { Fragment } from "react";
import toast from "react-hot-toast";
import LogoInput from "./LogoInput";
import useUpdateSettings from "./useUpdateSettings";
import useUpdateWebSettings from "./useUpdateWebSettings";

const socialLinksInput = [
  {
    id: "facebook",
    name: "facebook",
    placeholder: "https://facebook.com/yourpage",
    label: "Facebook URL",
  },
  {
    id: "youtube",
    name: "youtube",
    placeholder: "https://youtube.com/yourprofile",
    label: "Youtube URL",
  },
  {
    id: "instagram",
    name: "instagram",
    placeholder: "https://instagram.com/yourprofile",
    label: "Instagram URL",
  },
  {
    id: "twitter",
    name: "twitter",
    placeholder: "https://twitter.com/yourprofile",
    label: "Twitter URL",
  },
];

export default function SocialLinks() {
  const { isPending, mutate: updateSettingsFn } = useUpdateWebSettings();
  const { data, error, isPending: isGettingUpdateData } = useUpdateSettings();

  function handleSocialSubmit(eve) {
    eve.preventDefault();

    const formEle = eve.currentTarget;
    const formData = new FormData(formEle);

    // const facebook = formData.get("facebook");
    // const instagram = formData.get("instagram");
    // const twitter = formData.get("twitter");
    // const logo = formData.get("logo");

    updateSettingsFn(formData, {
      onSuccess: (data) => {
        toast.success(data.message);
        formEle.reset();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  const isLoading = isGettingUpdateData | isPending;
  const generalLinkData = data?.general.filter((data) => data.type === "link");

  const finalInputs = socialLinksInput.map((link) => {
    const findLink = generalLinkData?.find(
      (l) => l.name.toLowerCase() === link.id,
    );
    return { ...link, ...findLink };
  });

  return (
    <form onSubmit={handleSocialSubmit}>
      <LogoInput isPending={isLoading} />

      <h3 className="my-6 text-center text-xl tracking-wider">Social Links</h3>

      {finalInputs?.map((link) => (
        <Fragment key={link.id}>
          <div className="mb-6">
            <label
              htmlFor={link.id}
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {link.label}
            </label>
            <input
              disabled={isLoading}
              type="url"
              id={link.id}
              name={link.name.toLowerCase()}
              defaultValue={link?.link}
              placeholder={link.placeholder}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            />
          </div>
        </Fragment>
      ))}

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
