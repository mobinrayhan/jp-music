export default function Logo() {
  return (
    <div className={"flex flex-col items-center justify-center gap-2 pt-10"}>
      <img
        src={"/icon.png"}
        alt={"soundei logo"}
        className={"w-10/12 rounded-full"}
      />
      <h3 className={"pt-2 text-3xl tracking-wider"}>Soundei</h3>
    </div>
  );
}
