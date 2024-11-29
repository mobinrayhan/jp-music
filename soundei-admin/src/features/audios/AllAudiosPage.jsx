import AudioQuery from "./AudioQuery";
import AudioTableList from "./AudioTableList";

export default function AllAudiosPage() {
  return (
    <section className="rounded-md bg-slate-100 p-6">
      <h1 className="text-center text-3xl font-semibold tracking-wider">
        All Audios
      </h1>

      <AudioQuery />
      <AudioTableList />
    </section>
  );
}
