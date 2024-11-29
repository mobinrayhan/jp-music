import Spinner from "./Spinner";

export default function FullPageSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Spinner />{" "}
    </div>
  );
}
