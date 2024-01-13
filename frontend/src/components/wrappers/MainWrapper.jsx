const MainWrapper = ({ children }) => {
  return (
    <main className="m-auto h-screen w-full max-w-7xl overflow-hidden px-8 text-base font-normal">
      {children}
    </main>
  );
};

export default MainWrapper;
