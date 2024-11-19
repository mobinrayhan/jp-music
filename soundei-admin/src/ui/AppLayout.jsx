import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr]">
      <header className="col-start-2 col-end-3 border-b border-gray-200 p-6">
        <Header />
      </header>

      <aside className="col-start-1 col-end-2 row-start-1 row-end-3 border-r border-gray-200 p-6">
        <Sidebar />
      </aside>

      <main className="overflow-x-auto p-8">Main</main>
    </div>
  );
}
