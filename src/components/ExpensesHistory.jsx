import { useEffect, useState } from "react";
import { generateId } from "../helpers";
import { Deuda } from "./Deuda";

export const ExpensesHistory = ({ historyPaid, viewItemId }) => {
  const [filtredGroupExpenses, setFiltredGroupExpenses] = useState([]);

  useEffect(() => {
    // BUSCAR EL ID DEL GRUPO DE GASTOS
    const filtredGroupExpenses = historyPaid.filter(
      (group) => group.expenseData.id === viewItemId
    );

    setFiltredGroupExpenses(filtredGroupExpenses);
  }, [viewItemId]);

  return (
    <div>
      <div className="flex">
        <p className="w-2/6 text-center font-bold">Nombre</p>
        <p className="w-2/6 text-center font-bold">Cantidad</p>
        <p className="w-2/6 text-center font-bold">Fecha</p>
      </div>

      <ul className="mb-3 uppercase text-center">
        {filtredGroupExpenses?.map(({ expenses }) => (
          <div key={generateId()}>
            {expenses.map((expense) => (
              <Deuda key={expense.id} expense={expense} />
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};
