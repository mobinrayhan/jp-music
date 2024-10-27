import DownloadCategory from "./download-category";

export default async function Downloads({ searchValue, maxAudios }) {
  return <DownloadCategory searchValue={searchValue} maxAudios={maxAudios} />;
}
