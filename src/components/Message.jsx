import { useContext, useEffect, useState } from "react";
import { StatesContext } from "../context";

import {
  currencyFormat,
  formatTextForWhatsApp,
  randomElement,
} from "../helpers";

import { DebtorNumberItem } from "./DebtorNumberItem";

export const Message = () => {
  const { groupDebtors, groupingExpenses, selectedGroups, expenses } =
    useContext(StatesContext);

  const [selectedDebtor, setSelectedDebtor] = useState({});

  const [groupDebtorsExpenses, setGroupDebtorsExpenses] = useState([]);
  const [expensesAssoc, setexpensesAssoc] = useState([]);

  const [total, setTotal] = useState(0);
  const [totalDebtor, setTotalDebtor] = useState(0);

  const [enableInsult, setEnableInsult] = useState(false);
  const [insult, setInsult] = useState("");

  const generateLinkWa = () => {
    const baseLink = `https://api.whatsapp.com/send?phone=52${selectedDebtor.numero}&text=`;

    let gastosDetallados = "";
    let deudasDetalladas = "";

    groupDebtorsExpenses.forEach((expense) => {
      const { nombreGasto, cantidad } = expense;

      gastosDetallados =
        gastosDetallados += `- #${nombreGasto}: ${currencyFormat(
          Number(cantidad)
        )}#<`;
    });

    expensesAssoc.forEach((expense) => {
      const { nombreGasto, cantidad } = expense;

      deudasDetalladas =
        deudasDetalladas += `- #${nombreGasto}: ${currencyFormat(
          Number(cantidad)
        )}#<`;
    });

    const texto = formatTextForWhatsApp(
      `${
        enableInsult ? insult : selectedDebtor.nombreDeudor
      } esta es la cuenta <_${
        messageTotal() < 0 ? "Debes" : "Debo"
      } ${currencyFormat(Math.abs(messageTotal()))}_<${
        gastosDetallados ? "<*Gastos*<" : ""
      }${gastosDetallados}${
        deudasDetalladas ? "<*Debes*<" : ""
      }${deudasDetalladas}_______________________<*Total:* _*${currencyFormat(
        messageTotal()
      )}*_`
    );

    const mensaje = baseLink + texto;

    if (Object.keys(selectedDebtor).length) {
      // REDIRIGIR AL USUARIO
      // console.log(mensaje);
      location.href = mensaje;
    }
  };

  const onSelectDebtor = (debtor) => {
    if (groupDebtors.find((debtor) => debtor.id === selectedDebtor.id)) {
      setSelectedDebtor({});
      return;
    }

    setSelectedDebtor(debtor);
  };

  const messageTotal = () => {
    const allTotal = total - totalDebtor;

    return allTotal;
  };

  // AGREGAR TOTAL, LISTAS DE GASTOS Y DEUDAS Y GENERAR E INSERTAR BOTÓN
  useEffect(() => {
    const containerButtons = document.querySelector("#actions");

    function crearBoton() {
      const button = document.createElement("button");
      button.className =
        "bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4";
      button.innerText = "Enviar";
      button.id = "enviar";
      button.addEventListener("click", () => generateLinkWa());

      return button;
    }

    const groupDebtorsExpenses = expenses.filter((expense) => {
      return selectedGroups.includes(expense.idExpense);
    });

    const expensesAssoc = groupingExpenses.flatMap((groupExpense) => {
      // Verifica si el objeto tiene un "debtorId" y si el "id" está en el array "selectedGroups"
      if (groupExpense.debtorId && selectedGroups.includes(groupExpense.id)) {
        // Filtra los gastos que coincidan con el "idExpense" del objeto "groupExpense"
        return expenses.filter((expense) => {
          return expense.idExpense === groupExpense.debtorId;
        });
      } else {
        // Retorna un array vacío si el objeto no cumple con las condiciones anteriores
        return [];
      }
    });

    const filtredTotal = groupDebtorsExpenses.reduce((total, currentValue) => {
      return (
        total + Number(currentValue.cantidad) / Number(currentValue.dividir)
      );
    }, 0);

    const filtredDebtorsTotal = expensesAssoc.reduce((total, currentValue) => {
      return (
        total + Number(currentValue.cantidad) / Number(currentValue.dividir)
      );
    }, 0);

    setGroupDebtorsExpenses(groupDebtorsExpenses);
    setexpensesAssoc(expensesAssoc);

    setTotal(filtredTotal);
    setTotalDebtor(filtredDebtorsTotal);

    if (containerButtons.children.length === 1) {
      containerButtons.appendChild(crearBoton());
    }
  }, []);

  // ACTUZLIZAR BÓTON ENVIAR CON LOS DATOS GENERADOS DE LOS STATES
  useEffect(() => {
    document
      .querySelector("#enviar")
      .addEventListener("click", () => generateLinkWa());
  }, [selectedDebtor, enableInsult]);

  // GENERAR UN INSULTO ALEATORIO
  useEffect(() => {
    const randomInsult =
      randomElement(insultos) + " " + randomElement(insultos);

    setInsult(randomInsult);
  }, [enableInsult]);

  return (
    <section>
      <h3 className="text-xl text-gray-500 dark:text-gray-800 mb-4 text-center">
        Seleccione un Deudor
      </h3>

      <div className="grid md:grid-cols-3 grid-cols-2 py-2 items-center justify-around divide-x divide-solid">
        {groupDebtors.map((debtor) => (
          <DebtorNumberItem
            key={debtor.id}
            debtor={debtor}
            onSelectDebtor={onSelectDebtor}
            selectedDebtor={selectedDebtor}
          />
        ))}
      </div>

      {Object.keys(selectedDebtor).length > 0 && (
        <>
          <div className="w-full h-0.5 bg-indigo-300 mt-1"></div>

          <div className="mt-4 flex flex-col">
            <h2 className="text-xl text-gray-500 dark:text-gray-800 mb-4 text-center">
              Previzualizar mensaje
            </h2>

            <div className="flex flex-row mt-2 mx-auto">
              <input
                type="checkbox"
                id="insulto"
                value="cb2"
                className="
                  appearance-none h-6 w-6 bg-gray-400 rounded-full 
                  checked:scale-150 checked:opacity-0
                  transition-all duration-300 peer"
                onChange={() => setEnableInsult(!enableInsult)}
              />

              <div className="h-6 w-6 absolute rounded-full transition-all duration-300 transparent peer-checked:bg-indigo-500"></div>

              <label
                htmlFor="insulto"
                className="flex flex-col justify-center px-2 peer-checked:text-indigo-600 select-none mb-4"
              >
                Mandar Insulto Aleatorio
              </label>
            </div>

            <div className="bg-white dark:bg-gray-200 md:py-4 py-2 md:px-8 px-2">
              <p>
                {enableInsult ? insult : selectedDebtor.nombreDeudor} esta es la
                cuenta
              </p>

              <p className="italic mb-2">
                {messageTotal() < 0 ? "Debes" : "Debo"}{" "}
                {currencyFormat(Math.abs(messageTotal()))}
              </p>

              {groupDebtorsExpenses.length > 0 && (
                <p className="font-bold">Gastos</p>
              )}

              {groupDebtorsExpenses.map(({ nombreGasto, id, cantidad }) => (
                <p key={id} className="font-mono">
                  - {nombreGasto}: <span>{currencyFormat(+cantidad)}</span>
                </p>
              ))}

              {expensesAssoc.length > 0 && (
                <p className="font-bold mt-2">Debes</p>
              )}

              {expensesAssoc.map(({ nombreGasto, id, cantidad }) => (
                <p key={id} className="font-mono">
                  - {nombreGasto}: <span>{currencyFormat(+cantidad)}</span>
                </p>
              ))}

              <p>---------------------------</p>

              <p className="font-bold">
                Total:
                <span className="italic">
                  {" "}
                  {currencyFormat(messageTotal())}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

const insultos = [
  "Perro",
  "Sarnoso",
  "Gusano",
  "Rata",
  "Asqueroso",
  "Desgraciado",
  "Muerto de hambre",
  "Indigente",
  "Apestoso",
  "Insecto",
  "Hambreado",
  "Ratero",
  "Moroso",
  "Pobre",
  "De mierda",
];
