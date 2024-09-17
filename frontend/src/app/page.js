import { fetchWithApiKey } from "../../utils/api";

export default async function Home() {
  const data = await fetchWithApiKey();
  console.log(data);

  return <div>Home</div>;
}
