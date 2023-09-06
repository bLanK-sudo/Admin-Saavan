const Loader = () => {
  return (
    <main className="fixed w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-32 h-32 rounded-full">
        <img src="/logo.jpg" alt="Logo" className="rounded-full" />
      </div>
    </main>
  );
};

export default Loader;
