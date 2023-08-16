import { useContext, useEffect, useState } from "react";

import { StatesContext } from "../context";
import { Deuda } from "./Deuda";
import { FormNuevoGasto } from "./FormNuevoGasto";
import { currencyFormat } from "../helpers";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list"; // LIBRERIA PARA SWIPE
import "react-swipeable-list/dist/styles.css"; // ANIMACIONES DE LIBRERIAS

export const DeudasLista = () => {
  const {
    viewItemId,
    setError,
    setExpenses,
    expenses,
    setGroupDebtors,
    groupDebtors,
  } = useContext(StatesContext);

  const [nuevoGasto, setNuevoGasto] = useState(false);

  const [filtredExpenses, setFiltredExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const [editExpense, setEditExpense] = useState({});

  const leadingActions = (expense) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setEditExpense(expense);
          setNuevoGasto(true);
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (expense) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => removeExpense(expense.id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  function removeExpense(id) {
    const newExpenses = expenses.filter((expense) => expense.id !== id);

    setExpenses(newExpenses);
  }

  useEffect(() => {
    const filtredExpenses = expenses.filter(
      (expense) => expense.idExpense === viewItemId
    );

    const filtredTotal = filtredExpenses.reduce((total, currentValue) => {
      return (
        total + Number(currentValue.cantidad) / Number(currentValue.dividir)
      );
    }, 0);

    const newPrice = groupDebtors.map((expense) => {
      if (expense.id === viewItemId) {
        return { ...expense, total: filtredTotal };
      }

      return expense;
    });

    setFiltredExpenses(filtredExpenses);
    setTotal(filtredTotal);
    setGroupDebtors(newPrice);
  }, [expenses, viewItemId]);

  return (
    <>
      <p className="mb-4 uppercase font-bold text-gray-700 text-center text-xl">
        Lista de gastos:
      </p>

      <div className="flex">
        <p className="w-2/6 text-center font-bold">Nombre</p>
        <p className="w-2/6 text-center font-bold">Cantidad</p>
        <p className="w-2/6 text-center font-bold">Fecha</p>
      </div>

      {!nuevoGasto ? (
        <>
          <ul className="mb-3 uppercase text-center">
            {filtredExpenses.map((expense) => (
              <SwipeableList key={expense.id}>
                <SwipeableListItem
                  leadingActions={leadingActions(expense)} // ACCIÓN DE LA IZQUIERDA
                  trailingActions={trailingActions(expense)} // ACCIÓN DE LA DERECHA
                >
                  <Deuda
                    expense={expense}
                    setEditExpense={setEditExpense}
                    setNuevoGasto={setNuevoGasto}
                  />
                </SwipeableListItem>
              </SwipeableList>
            ))}
          </ul>

          <a
            className="block w-full py-2 my-2 text-center text-gray-400 hover:bg-neutral-600 hover:text-white transition-all duration-200"
            onClick={() => {
              setNuevoGasto(true), setEditExpense({});
            }}
          >
            Añadir Nuevo Gasto
          </a>
        </>
      ) : (
        <FormNuevoGasto
          setError={setError}
          setNuevoGasto={setNuevoGasto}
          expenses={expenses}
          setExpenses={setExpenses}
          viewItemId={viewItemId}
          editExpense={editExpense}
        />
      )}

      <div className="w-full h-0.5 bg-indigo-400 mt-1"></div>

      <p className="font-bold md:w-2/6 text-center my-3">
        Total: <span className="font-normal">{currencyFormat(total)}</span>
      </p>
    </>
  );
};
