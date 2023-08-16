export const InputRange = ({ handle, value, name }) => {
  return (
    <div className="flex justify-around items-center">
      <input
        className="basis-10/12 rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
        onInput={handle}
        name={name}
        id={name}
        value={value}
        type="range"
        min="1"
        max="12"
      />
      <div className="basis-2/12 text-center font-bold text-xl text-indigo-700">
        {value}
      </div>
    </div>
  );
};
