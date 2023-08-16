import { useContext, useEffect } from "react";
import { StatesContext } from "../context";
import { SelectItem } from "./SelectItem";

export const SendWhatsapp = () => {
  const {
    groupingExpenses,
    groupDebtors,
    selectedGroups,
    setSelectedGroups,
    typePopup,
  } = useContext(StatesContext);

  const allGroups = [...groupDebtors, ...groupingExpenses];

  const onSelectGroup = (id) => {
    if (!selectedGroups.find((groupId) => groupId === id)) {
      setSelectedGroups((prevSelectedGroups) => [...prevSelectedGroups, id]);
    } else {
      const quitSelectedGroup = selectedGroups.filter(
        (groupId) => groupId !== id
      );

      setSelectedGroups(quitSelectedGroup);
    }
  };

  useEffect(() => {
    const botonEnviar = document.querySelector("#enviar");

    if (botonEnviar) {
      botonEnviar.remove();
    }
  }, []);

  return (
    <>
      <h2 className="text-center mb-3 font-semibold">
        Selecciona los gastos que deseas enviar
      </h2>

      <section className="grid md:grid-cols-3 grid-cols-2 py-2 items-center justify-around divide-x divide-solid">
        {allGroups.map((group) => (
          <SelectItem
            key={group.id}
            group={group}
            onSelectGroup={onSelectGroup}
            selectedGroups={selectedGroups}
          />
        ))}
      </section>
    </>
  );
};
