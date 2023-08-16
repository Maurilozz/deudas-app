const Error = ({ children }) => {
  return (
    <div className="bg-rose-600 p-3 my-3 mx-2 rounded-xl">
      <p className="text-center text-white font-bold uppercase">{children}</p>
    </div>
  );
};

export default Error;
