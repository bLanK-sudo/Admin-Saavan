export default function Unauthorized() {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center min-h-[70vh]">
        <h1 className="text-4xl font-bold">Unauthorized</h1>
        <p>You are not an event head!!</p>
      </div>
    </>
  );
}
