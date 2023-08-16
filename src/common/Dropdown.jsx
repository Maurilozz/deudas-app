export function Dropdown({ children, openDropdown, toggleDropdown }) {
  return (
    <div className="relative">
      <a
        onClick={toggleDropdown}
        className="px-4 py-2 my-4 bg-indigo-600 text-white rounded block text-center"
      >
        Seleccione un emoticono (opcional)
      </a>

      {openDropdown && (
        <ul className="absolute top-10 md:right-1/4 md:left-1/4 bg-white border border-gray-200 rounded py-4 md:px-2 md:w-1/2 shadow-lg grid grid-cols-3 md:gap-4 justify-center items-center w-full">
          {children}
        </ul>
      )}
    </div>
  );
}
