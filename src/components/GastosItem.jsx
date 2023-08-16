import { useContext } from "react";
import { Icons } from "../common/Icons";
import { StatesContext } from "../context";

export const GastosItem = ({
  setShowPopup,
  setTitulo,
  setTypePopup,
  setScrollBlockIsActive,
  nameIcon,
  groupExpense,
}) => {
  const { nombreGasto, id, total, debtorId } = groupExpense && groupExpense;

  const { setViewItemId, setDebtorAssocId } = useContext(StatesContext);

  const openPopup = () => {
    setShowPopup(true);
    setTitulo(nombreGasto);
    setTypePopup("list-expenses");
    setScrollBlockIsActive(true);
  };

  return (
    <div
      className="my-4 px-4 py-3 flex bg-white dark:bg-gray-200 rounded-xl items-center cursor-pointer"
      onClick={() => {
        openPopup(), setViewItemId(id), setDebtorAssocId(debtorId);
      }}
    >
      <Icons name={nameIcon} />

      <div className="ml-4">
        <p className="font-bold text-lg">{nombreGasto}</p>
        <p
          className={`font-semibold ${
            total < 0 ? "text-green-600" : "text-black"
          }`}
        >
          Total: ${total}
        </p>
      </div>
    </div>
  );
};
