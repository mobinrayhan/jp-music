import { fetchWithApiKey } from "../../utils/api";

export default async function Home() {
  const data = await fetchWithApiKey("http://localhost:4000");
  console.log(data);

  return <div>Home</div>;
}
