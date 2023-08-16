import { useContext, useState } from "react";

import { useForm } from "../hooks/useForm";

import { generateId } from "../helpers";
import { Dropdown } from "../common/Dropdown";
import { Icons } from "../common/Icons";
import { StatesContext } from "../context";

export const FormGasto = ({ setShowPopup, openDropdown, toggleDropdown }) => {
  const { setError, setGroupingExpenses, groupDebtors } =
    useContext(StatesContext);

  const [icon, setIcon] = useState("service");

  const { formState, handleForm } = useForm({
    nombreGasto: "",
    debtorId: "",
    total: 0,
    id: generateId(),
  });

  const { nombreGasto } = formState;

  const handleSubmitDeuda = (e) => {
    e.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    // Verificar si el campo de "Nombre de gasto" está vacío
    if (!nombreGasto) {
      setError("Nombre de gasto es Obligatorio");
      return;
    }

    // Crear un objeto con los valores del formulario y el ícono seleccionado
    const formEstateUpdate = {
      ...formState,
      iconName: icon,
    };

    // Agregar el objeto creado anteriormente al estado de "expenses"
    setGroupingExpenses((prevExpenses) => [...prevExpenses, formEstateUpdate]);

    // Cerrar el popup
    setShowPopup(false);
  };

  return (
    <form
      className="bg-white py-5 px-5 rounded-xl shadow-md mb-5 mx-5"
      onSubmit={handleSubmitDeuda}
    >
      <h4 className="text-center text-gray-500">
        (Agrega cosas de debes a alguien o una lista de gastos)
      </h4>

      <div className="mt-5">
        <label
          htmlFor="nombreGasto"
          className="font-bold text-gray-700 block uppercase text-center"
        >
          Nombre de Consumo
        </label>

        <input
          type="text"
          name="nombreGasto"
          id="nombreGasto"
          onChange={handleForm}
          value={nombreGasto}
          className="p-2 mt-1 w-full border-2 placeholder-gray-400 rounded-md text-center"
          placeholder="Nuevo Consumo"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="nombreDeuda"
          className="font-bold text-gray-700 block uppercase text-center"
        >
          Restar este gasto de alguien que te deba
        </label>

        <select
          className="block w-full p-2 border rounded-md text-center"
          defaultValue=""
          name="debtorId"
          id="debtorId"
          onChange={handleForm}
        >
          <option value="">Ninguno</option>
          {groupDebtors.map((debtor) => (
            <option key={debtor.id} value={debtor.id}>
              {debtor.nombreDeudor}
            </option>
          ))}
        </select>
      </div>

      <Dropdown openDropdown={openDropdown} toggleDropdown={toggleDropdown}>
        {iconsNames.map((iconName) => (
          <li
            className="flex md:justify-center py-2 bg-white hover:bg-gray-200 cursor-pointe mx-auto"
            onClick={() => {
              setIcon(iconName), toggleDropdown();
            }}
            key={iconName}
          >
            <Icons name={iconName} />
          </li>
        ))}
      </Dropdown>

      <input
        type="submit"
        value="Añadir"
        className="bg-indigo-600 w-full p-2 text-white rounded-md hover:bg-indigo-700 cursor-pointer transition-colors font-bold uppercase mt-3"
      />
    </form>
  );
};

const iconsNames = [
  "business",
  "food",
  "rent",
  "shopping",
  "recreation",
  "gas",
  "health",
  "service",
  "user1",
];
