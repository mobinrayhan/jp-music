import QuerySearch from "../../ui/QuerySearch";
import AudioTableList from "./AudioTableList";
import AudioTableOperation from "./AudioTableOperation";

export default function AllAudiosPage() {
  return (
    <section className="rounded-md bg-slate-100 p-6">
      <h1 className="text-center text-3xl font-semibold tracking-wider">
        All Audios
      </h1>

      <header className="flex items-center justify-between">
        <QuerySearch placeholder={"Enter Your Audio Name Or Keyword"} />
        <AudioTableOperation />
      </header>

      <AudioTableList />
    </section>
  );
}
