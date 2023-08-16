import { useContext } from "react";
import { StatesContext } from "../context";

export const User = () => {
  const { darkMode, setDarkMode, setShowPopup, setTitle, setTypePopup } =
    useContext(StatesContext);

  const darkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className="view opacity-0 transition-opacity duration-500">
      <div className="pb-32 h-full flex flex-col bg-gray-100 dark:bg-gray-700 shadow-xl overflow-y-scroll">
        <div className="bg-indigo-400 shadow-lg pb-3 rounded-b-3xl">
          <div className="flex  rounded-b-3xl bg-gray-100 dark:bg-gray-700 space-y-5 flex-col items-center py-7">
            <img
              className="h-28 w-28 rounded-full"
              src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
              alt="User"
            />
            <a href="#">
              {" "}
              <span className="text-h1 dark:text-white">Usuario</span>
            </a>
          </div>

          <div className="grid px-7 py-2 items-center justify-around grid-cols-3 gap-4 divide-x divide-solid">
            <div className="col-span-1 flex flex-col items-center ">
              <span className="text-2xl font-bold dark:text-gray-200">4</span>
              <span className="text-lg font-medium 0">Gastos</span>
            </div>

            <div className="col-span-1 px-3 flex flex-col items-center ">
              <span className="text-2xl font-bold dark:text-gray-200">
                Free
              </span>
              <span className="text-lg font-medium">Plan</span>
            </div>

            <div className="col-span-1 px-3 flex flex-col items-center ">
              <span className="text-2xl font-bold dark:text-gray-200">
                $546
              </span>
              <span className="text-lg font-medium">Gastado</span>
            </div>
          </div>
        </div>

        <div className="grid rounded-2xl divide-y divide-dashed hover:divide-solid  justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
          <div className="col-span-1  p-3">
            <div className="flex flex-col items-center ">
              <a>
                {" "}
                <button>
                  <span className="material-symbols-outlined text-6xl block">
                    account_circle
                  </span>

                  <span className="text-lg font-medium">Mi Perfil</span>
                </button>
              </a>
            </div>
          </div>

          <div className="col-span-1  p-3">
            <div className="flex flex-col items-center ">
              <a onClick={darkModeToggle}>
                {" "}
                <button>
                  <span
                    className={`material-symbols-outlined text-6xl block transition-all duration-150 ${
                      darkMode ? "fill" : ""
                    }`}
                  >
                    dark_mode
                  </span>

                  <span className="text-lg font-medium">Modo Oscuro</span>
                </button>
              </a>
            </div>
          </div>

          <div className="col-span-1  p-3">
            <div className="flex flex-col items-center ">
              <a
                onClick={() => {
                  setShowPopup(true),
                    setTitle("Enviar por whastapp"),
                    setTypePopup("send-expenses");
                }}
              >
                {" "}
                <button>
                  <span className="material-symbols-outlined text-6xl block transition-all duration-150">
                    send
                  </span>

                  <span className="text-lg font-medium">
                    Enviar por Whatsapp
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="flex mx-auto mt-3 w-100 ">
          <a>
            {" "}
            <button className="p-2 shadow-lg rounded-2xl tr-300 w-100 font-medium  bg-indigo-500 hover:bg-indigo-600 text-gray-50">
              Mejorar membresía
            </button>
          </a>
        </div>
      </div>
    </main>
  );
};
