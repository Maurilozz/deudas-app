import { useForm } from "../hooks/useForm";

import { dateShort, generateId } from "../helpers";
import { InputRange } from "../common/InputRange";

export const FormNuevoGasto = ({
  expenses,
  setExpenses,
  setError,
  setNuevoGasto,
  viewItemId,
  editExpense,
}) => {
  const { formState, handleForm } = useForm({
    nombreGasto: editExpense.nombreGasto ?? "",
    cantidad: editExpense.cantidad ?? "",
    dividir: editExpense.dividir ?? 1,
    id: editExpense.id ?? generateId(),
    idExpense: editExpense.idExpense ?? viewItemId,
    fecha: editExpense.fecha ?? dateShort(Date.now()),
  });

  const { nombreGasto, cantidad, dividir, id } = formState;

  const handleSubmitDeuda = (e) => {
    e.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    // Verificar si el campo de "Nombre de gasto" o "Cantidad" está vacío
    if (!nombreGasto || !cantidad) {
      setError(
        !nombreGasto ? "Nombre de gasto es Obligatorio" : "Agregue una Cantidad"
      );
      return;
    }

    // Crear un nuevo arreglo si hay un valor a editar, de lo contrario agregar un objeto al estado de "expenses"
    const updatedExpenses = Object.keys(editExpense).length
      ? expenses.map((expense) =>
          expense.id === editExpense.id ? formState : expense
        )
      : [...expenses, formState];

    // Actualizar el estado de "expenses" con el objeto creado anteriormente
    setExpenses(updatedExpenses);

    // Cerrar Formulario
    setNuevoGasto(false);
  };

  return (
    <form
      className="bg-white py-10 px-5 rounded-xl shadow-md mb-5 mx-5 relative"
      onSubmit={handleSubmitDeuda}
    >
      <span
        className="material-symbols-outlined absolute right-2 top-5 text-red-600 cursor-pointer"
        onClick={() => setNuevoGasto(false)}
      >
        cancel
      </span>

      <div className="mt-5">
        <label
          htmlFor="nombreDeuda"
          className="font-bold text-gray-700 block uppercase"
        >
          Nombre de Consumo
        </label>

        <input
          type="text"
          name="nombreGasto"
          id="nombreGasto"
          onChange={handleForm}
          value={nombreGasto}
          className="p-2 mt-1 w-full border-2 placeholder-gray-400 rounded-md"
          placeholder="Nuevo Consumo"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="cantidad"
          className="font-bold text-gray-700 block uppercase"
        >
          Cantidad
        </label>

        <input
          type="number"
          name="cantidad"
          id="cantidad"
          onChange={handleForm}
          value={cantidad}
          className="p-2 mt-1 w-full border-2 placeholder-gray-400 rounded-md"
          placeholder="Cantidad"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="dividir"
          className="font-bold text-gray-700 block uppercase"
        >
          Dividir
        </label>

        <InputRange handle={handleForm} value={dividir} name={"dividir"} />
      </div>

      <input
        type="submit"
        value={`${Object.keys(editExpense).length ? "Actualizar" : "Añadir"}`}
        className="bg-indigo-600 w-full p-2 text-white rounded-md hover:bg-indigo-700 cursor-pointer transition-colors font-bold uppercase mt-3"
      />
    </form>
  );
};
