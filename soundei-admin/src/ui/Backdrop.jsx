export default function Backdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute left-0 top-0 h-screen w-full bg-black/20 backdrop-blur-md"
    />
  );
}
