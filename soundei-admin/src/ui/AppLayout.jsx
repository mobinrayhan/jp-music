export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr]">
      <header className="col-start-1 col-end-3 bg-red-300">
        <h1>Heder</h1>
      </header>

      <aside className="col-start-1 col-end-2 bg-red-500">
        <h1>ASIDE</h1>
      </aside>

      <main className="overflow-x-auto bg-red-700">Main</main>
    </div>
  );
}
