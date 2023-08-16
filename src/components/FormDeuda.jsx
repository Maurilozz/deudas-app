import { useContext, useState } from "react";

import { useForm } from "../hooks/useForm";

import { generateId } from "../helpers";
import { Dropdown } from "../common/Dropdown";
import { Icons } from "../common/Icons";
import { StatesContext } from "../context";

export const FormDeuda = ({ setShowPopup, openDropdown, toggleDropdown }) => {
  const { setError, setGroupDebtors } = useContext(StatesContext);

  const [icon, setIcon] = useState("user1");

  const { formState, handleForm } = useForm({
    nombreDeudor: "",
    numero: "",
    total: 0,
    id: generateId(),
  });

  const { nombreDeudor, numero } = formState;

  const handleSubmitDeuda = (e) => {
    e.preventDefault();

    if (!nombreDeudor) {
      setError("Nombre del deudor es Obligatorio");
      return;
    }

    if (!numero) {
      setError("Agregue un numero");
      return;
    }

    if (numero.length !== 10 || isNaN(numero)) {
      setError("Numero No Valido");
      return;
    }

    const formEstateUpdate = {
      ...formState,
      iconName: icon,
    };

    setGroupDebtors((prevDebtors) => [...prevDebtors, formEstateUpdate]);
    setShowPopup(false);
  };

  return (
    <form
      className="bg-white py-5 px-5 rounded-xl shadow-md mb-5 mx-5"
      onSubmit={handleSubmitDeuda}
    >
      <h4 className="text-center text-gray-500">
        (Agrega alguien que te deba)
      </h4>

      <div className="mt-5">
        <label
          htmlFor="nombreDeudor"
          className="font-bold text-gray-700 block uppercase text-center"
        >
          Nombre del deudor
        </label>

        <input
          type="text"
          name="nombreDeudor"
          id="nombreDeudor"
          onChange={handleForm}
          value={nombreDeudor}
          className="p-2 mt-1 w-full border-2 placeholder-gray-400 rounded-md text-center"
          placeholder="Nombre de quien te debe"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="numero"
          className="font-bold text-gray-700 block uppercase text-center"
        >
          Numero Whatsapp
        </label>

        <input
          type="number"
          name="numero"
          id="numero"
          onChange={handleForm}
          value={numero}
          className="p-2 mt-1 w-full border-2 placeholder-gray-400 rounded-md text-center"
          placeholder="Numero del deudor"
        />
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
  "user1",
  "user2",
  "user3",
  "user4",
  "user5",
  "user6",
  "user7",
  "user8",
  "user9",
];
