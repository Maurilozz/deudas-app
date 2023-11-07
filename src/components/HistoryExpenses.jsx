import { useContext } from "react";
import { StatesContext } from "../context";
import { HistoryItem } from "./HistoryItem";
import { generateId } from "../helpers";

export const HistoryExpenses = () => {
  const {
    historyPaid,
    setShowPopup,
    setTitle,
    setTypePopup,
    setScrollBlockIsActive,
    setViewItemId,
  } = useContext(StatesContext);

  return (
    <main className="dark:bg-gray-700 h-screen pt-1 view opacity-0 transition-opacity duration-500">
      <h1 className="text-3xl font-bold text-center mt-4 dark:text-gray-100">
        Historial de pagos
      </h1>

      <section className="px-4 mx-6 mt-8 bg-gray-50 dark:bg-gray-300 shadow-xl rounded-xl overflow-scroll max-device">
        <h2 className="text-xl font-bold mb-4">Pagos</h2>
        {historyPaid.length ? (
          <div className="py-2 rounded-xl">
            <h3 className="text-xl text-gray-500 dark:text-gray-800 mb-4">
              Lista de pagos
            </h3>

            {historyPaid.map((historyGroup) => (
              <HistoryItem
                key={generateId()}
                expenseGroup={historyGroup.expenseData}
                setShowPopup={setShowPopup}
                setTitle={setTitle}
                setTypePopup={setTypePopup}
                setScrollBlockIsActive={setScrollBlockIsActive}
                setViewItemId={setViewItemId}
              />
            ))}
          </div>
        ) : (
          <h3 className="text-xl text-gray-500 mb-4 pb-6">
            Aún no hay nada que mostrar
          </h3>
        )}
      </section>
    </main>
  );
};
