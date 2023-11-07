import { useContext, useEffect } from "react";
import { StatesContext } from "../context";
import Error from "../common/Error";

export const Popup = ({
  children,
  setShowPopup,
  title,
  scrollBlockIsActive,
  error,
}) => {
  const { deleteGroup, viewItemId, typePopup, setTypePopup } =
    useContext(StatesContext);

  useEffect(() => {
    if (scrollBlockIsActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [scrollBlockIsActive]);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 max-h-full overflow-scroll"
      onClick={() => setShowPopup(false)}
    >
      <div
        className="bg-gray-50 dark:bg-gray-300 rounded-lg p-4 w-full mx-3"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4 pr-6 text-center inline relative ml-auto">
          Pagado
          <span
            className={`material-symbols-outlined cursor-pointer absolute`}
            // onClick={() => setSection("debtors")}
          >
            check
          </span>
        </p>

        <p className="font-bold mb-8 text-center text-xl">{title}</p>

        <div className="overflow-scroll">{children}</div>

        {error && <Error>{error}</Error>}

        <div id="actions" className="flex justify-between md:px-5 mt-5">
          {typePopup !== "message" && (
            <button
              className="bg-stone-500 hover:bg-stone-600 text-white rounded-lg py-2 px-4"
              onClick={() => setShowPopup(false)}
            >
              Cerrar
            </button>
          )}

          {typePopup === "list-debtors" && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4"
              onClick={() => deleteGroup(viewItemId)}
            >
              Eliminar Deudor
            </button>
          )}

          {typePopup === "list-expenses" && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4"
              onClick={() => deleteGroup(viewItemId)}
            >
              Eliminar Grupo de gastos
            </button>
          )}

          {typePopup === "send-expenses" && (
            <button
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4"
              onClick={() => setTypePopup("message")}
            >
              Continuar
            </button>
          )}

          {typePopup === "message" && (
            <button
              className="bg-stone-500 hover:bg-stone-600 text-white rounded-lg py-2 px-4"
              onClick={() => setTypePopup("send-expenses")}
            >
              Regresar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
