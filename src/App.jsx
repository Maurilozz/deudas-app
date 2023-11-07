import { useEffect, useState } from "react";

import { DeudoresItem } from "./components/DeudoresItem";
import { GastosItem } from "./components/GastosItem";
import { Popup } from "./components/Popup";
import { StatesContext } from "./context";

import { GastosLista } from "./components/GastosLista";
import { NuevoConsumo } from "./components/NuevoConsumo";
import { User } from "./components/User";
import { DeudasLista } from "./components/DeudasLista";
import { HistoryExpenses } from "./components/HistoryExpenses";
import { Debtors } from "./components/Debtors";
import { SendWhatsapp } from "./components/SendWhatsapp";
import { Message } from "./components/Message";
import { ShareTarget } from "./components/ShareTarget";
import { dateShort, generateId } from "./helpers";
import { ExpensesHistory } from "./components/ExpensesHistory";

export const App = () => {
  const [section, setSection] = useState("home");
  const [viewItemId, setViewItemId] = useState("");
  const [debtorAssocId, setDebtorAssocId] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [typePopup, setTypePopup] = useState("");
  const [title, setTitle] = useState("");

  const [error, setError] = useState("");

  const [groupDebtors, setGroupDebtors] = useState(
    JSON.parse(localStorage.getItem("groupDebtors")) ?? []
  );
  const [groupingExpenses, setGroupingExpenses] = useState(
    JSON.parse(localStorage.getItem("groupingExpenses")) ?? []
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) ?? []
  );

  const [historyPaid, setHistoryPaid] = useState(
    JSON.parse(localStorage.getItem("historyPaid")) ?? []
  );

  const [scrollBlockIsActive, setScrollBlockIsActive] = useState(false);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? false
  );

  // SEND EXPENSES
  const [selectedGroups, setSelectedGroups] = useState([]);

  const percentage = 0;

  const deleteGroup = (id) => {
    let groupUpdated;

    // Si el "typePopup" es "list-expenses", entonces se busca el objeto en "groupingExpenses" para eliminarlo
    if (typePopup === "list-expenses") {
      groupUpdated = groupingExpenses.filter((deudor) => deudor.id !== id);
      setGroupingExpenses(groupUpdated);
    }

    if (typePopup === "list-debtors") {
      groupUpdated = groupDebtors.filter((deudor) => deudor.id !== id);
      setGroupDebtors(groupUpdated);
    }

    if (typePopup === "list-history") {
      groupUpdated = historyPaid.filter((group) => group.expenseData.id !== id);
      setHistoryPaid(groupUpdated);
    }

    // Luego, se busca el objeto en "expenses" y se elimina
    const expensesUpdate = expenses.filter(
      (expense) => expense.idExpense !== id
    );
    setExpenses(expensesUpdate);

    // Finalmente, se cierra el popup
    setShowPopup(false);
  };

  const checkPaid = () => {
    // Buscar el elemento con ID viewItemId en groupDebtors y groupingExpenses
    const foundInDebtors = groupDebtors.find((item) => item.id === viewItemId);
    const foundInExpenses = groupingExpenses.find(
      (item) => item.id === viewItemId
    );

    // Determinar si se encontró el elemento en alguna de las listas
    const foundExpense = foundInDebtors || foundInExpenses;

    // Si se encontró el elemento, proceder a actualizar los estados
    if (foundExpense) {
      // Obtener solo los elementos de expenses que coinciden con viewItemId
      const matchingExpenses = expenses.filter(
        (expense) => expense.idExpense === viewItemId
      );

      // Eliminar Gstos coincidentes
      const newMatchingExpenses = expenses.filter(
        (item) => item.idExpense !== viewItemId
      );

      // Actualizar lista
      setExpenses(newMatchingExpenses);

      // Crear un objeto que combine la información del elemento encontrado y los datos de expenses que coinciden
      const historyItem = {
        expenseData: {
          ...foundExpense, // Incluir todos los datos de foundExpense
          date: dateShort(Date.now()), // Agregar la fecha actual
          id: generateId(),
        },
        expenses: matchingExpenses,
      };

      // Agregar el objeto creado al historial de pagos
      setHistoryPaid((prevHistoryPaid) => [...prevHistoryPaid, historyItem]);

      // Cerrar el popup (si está abierto)
      setShowPopup(false);
    }
  };

  // GUARDAR DATOS EN EL ALMACENAMIENTO LOCAL
  useEffect(() => {
    // GUARDAR EN ALMACENAMIENTO LOCAL
    localStorage.setItem("groupDebtors", JSON.stringify(groupDebtors));
  }, [groupDebtors]);

  useEffect(() => {
    // GUARDAR EN ALMACENAMIENTO LOCAL
    localStorage.setItem("groupingExpenses", JSON.stringify(groupingExpenses));
  }, [groupingExpenses]);

  useEffect(() => {
    // GUARDAR EN ALMACENAMIENTO LOCAL
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    // GUARDAR EN ALMACENAMIENTO LOCAL
    localStorage.setItem("historyPaid", JSON.stringify(historyPaid));
  }, [historyPaid]);

  useEffect(() => {
    // GUARDAR EN ALMACENAMIENTO LOCAL
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // ------------------------------------------

  // CAMBIAR A DARKMODE
  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark", "bg-gray-700");
    } else {
      document.querySelector("html").classList.remove("dark", "bg-gray-700");
    }
  }, [darkMode]);

  // ERROR Y REMOVER DEPUES DEL TIEMPO DEFINIDO
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  // OPACITY CONTROL
  useEffect(() => {
    const timeout = setTimeout(() => {
      const element = document.querySelector(".view");
      element.classList.remove("opacity-0");
    }, 200);

    return () => clearTimeout(timeout);
  }, [section]);

  const states = {
    setShowPopup,
    typePopup,
    setTypePopup,
    setTitle,
    setScrollBlockIsActive,
    darkMode,
    setDarkMode,
    viewItemId,
    setViewItemId,
    debtorAssocId,
    setDebtorAssocId,
    setError,
    groupingExpenses,
    setGroupingExpenses,
    groupDebtors,
    setGroupDebtors,
    expenses,
    setExpenses,
    historyPaid,
    deleteGroup,
    checkPaid,
    selectedGroups,
    setSelectedGroups,
  };

  return (
    <StatesContext.Provider value={states}>
      {section === "home" && (
        <main className="dark:bg-gray-700 view pb-40 pt-1 transition-opacity duration-500 opacity-0">
          <h1 className="text-3xl font-bold text-center mt-4 dark:text-gray-100">
            INICIO
          </h1>

          <ShareTarget />
          {/* <HomeScreenPrompt /> */}

          <section className="px-4 mx-6 mt-8 bg-gray-50 dark:bg-gray-300 shadow-xl rounded-xl">
            <h2 className="text-xl font-bold mb-4">Analisis</h2>

            <div className="p-4 flex justify-center">
              {/* <Circle
                progress={percentage}
                animate={true}
                animationDuration="1s"
                lineWidth="10"
                progressColor="#3F51B5"
                textColor="#3F51B5"
                textStyle={{
                  font: "bold 5rem Helvetica, Arial, sans-serif", // Ejemplo de estilo de texto personalizado
                }}
              /> */}
            </div>
          </section>

          <section className="px-4 mx-6 mt-8 bg-gray-50 dark:bg-gray-300 shadow-xl rounded-xl">
            <h2 className="text-xl font-bold mb-4">Gastos</h2>
            {groupingExpenses.length ? (
              <div className="py-2 rounded-xl">
                <h3 className="text-xl text-gray-500 dark:text-gray-800 mb-4">
                  Lista de gastos
                </h3>

                {groupingExpenses.map((groupExpense) => (
                  <GastosItem
                    key={groupExpense.id}
                    groupExpense={groupExpense}
                    setShowPopup={setShowPopup}
                    setTitulo={setTitle}
                    setTypePopup={setTypePopup}
                    setScrollBlockIsActive={setScrollBlockIsActive}
                    nameIcon={groupExpense.iconName}
                  />
                ))}
              </div>
            ) : (
              <h3 className="text-xl text-gray-500 mb-4 pb-6">
                Aún no hay gastos que mostrar, crea tu primer gasto con +
              </h3>
            )}
          </section>

          <section className="px-4 mx-6 mt-8 bg-gray-50 dark:bg-gray-300 shadow-xl rounded-xl">
            <h2 className="text-xl font-bold mb-4">Deudores</h2>
            {groupDebtors.length ? (
              <div className="py-2 rounded-xl">
                <h3 className="text-xl text-gray-500 dark:text-gray-800  mb-4">
                  Lista de Deudores
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
      )}

      {section === "debtors" && <Debtors />}

      {section === "expenses" && <HistoryExpenses />}

      {section === "user" && <User />}

      <nav className="bg-black fixed bottom-5 p-6 w-full flex justify-around">
        <span
          className={`material-symbols-outlined cursor-pointer transition-all duration-500 ${
            section === "home" ? "text-indigo-300 fill" : "text-white"
          }`}
          onClick={() => setSection("home")}
        >
          home
        </span>

        <span
          className={`material-symbols-outlined cursor-pointer transition-all duration-500 ${
            section === "debtors" ? "text-indigo-300 fill" : "text-white"
          }`}
          onClick={() => setSection("debtors")}
        >
          attach_money
        </span>

        <div
          className="absolute bg-indigo-900 p-3 bottom-11 flex items-center rounded-full"
          onClick={() => {
            setShowPopup(true),
              setTypePopup("new-expenses"),
              setTitle("Nuevo"),
              setScrollBlockIsActive(true);
          }}
        >
          <span className="material-symbols-outlined cursor-pointer text-white ">
            add
          </span>
        </div>

        <div></div>

        <span
          className={`material-symbols-outlined cursor-pointer transition-all duration-500 ${
            section === "expenses" ? "text-indigo-300 fill" : "text-white"
          }`}
          onClick={() => setSection("expenses")}
        >
          menu_book
        </span>

        <span
          className={`material-symbols-outlined cursor-pointer transition-all duration-500 ${
            section === "user" ? "text-indigo-300 fill" : "text-white"
          }`}
          onClick={() => setSection("user")}
        >
          person
        </span>
      </nav>

      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          title={title}
          scrollBlockIsActive={scrollBlockIsActive}
          error={error}
        >
          {typePopup === "list-expenses" && <GastosLista />}
          {typePopup === "list-debtors" && <DeudasLista />}
          {typePopup === "send-expenses" && <SendWhatsapp />}
          {typePopup === "message" && <Message />}
          {typePopup === "list-history" && (
            <ExpensesHistory
              historyPaid={historyPaid}
              viewItemId={viewItemId}
            />
          )}
          {typePopup === "new-expenses" && (
            <NuevoConsumo
              expenses={groupingExpenses}
              setShowPopup={setShowPopup}
            />
          )}
        </Popup>
      )}
    </StatesContext.Provider>
  );
};
