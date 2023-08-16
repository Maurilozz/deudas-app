import { useContext } from "react";
import { StatesContext } from "../context";
import { DeudoresItem } from "./DeudoresItem";

export const Debtors = () => {
  const {
    groupDebtors,
    setShowPopup,
    setTitle,
    setTypePopup,
    setScrollBlockIsActive,
  } = useContext(StatesContext);

  return (
    <main className="dark:bg-gray-700 h-screen pt-1 view opacity-0 transition-opacity duration-500">
      <h1 className="text-3xl font-bold text-center mt-4 dark:text-gray-100">
        Lista de Deudores
      </h1>

      <section className="px-4 mx-6 mt-8 bg-gray-50 dark:bg-gray-300 shadow-xl rounded-xl">
        <h2 className="text-xl font-bold mb-4">Gastos</h2>
        {groupDebtors.length ? (
          <div className="py-2 rounded-xl">
            <h3 className="text-xl text-gray-500 dark:text-gray-800 mb-4">
              Lista de gastos
            </h3>

            {groupDebtors.map((groupDebtor) => (
              <DeudoresItem
                key={groupDebtor.id}
                groupDebtor={groupDebtor}
                setShowPopup={setShowPopup}
                setTitulo={setTitle}
                setTypePopup={setTypePopup}
                setScrollBlockIsActive={setScrollBlockIsActive}
                nameIcon={groupDebtor.iconName}
              />
            ))}
          </div>
        ) : (
          <h3 className="text-xl text-gray-500 mb-4 pb-6">
            Aún no hay deudores que mostrar, crea tu primer deudor con +
          </h3>
        )}
      </section>
    </main>
  );
};
