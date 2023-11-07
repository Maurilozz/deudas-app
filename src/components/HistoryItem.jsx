import { Icons } from "../common/Icons";

export const HistoryItem = ({
  expenseGroup,
  setShowPopup,
  setTitle,
  setTypePopup,
  setScrollBlockIsActive,
  setViewItemId,
}) => {
  const openPopup = () => {
    setShowPopup(true);
    setTitle("Historial de pagos");
    setTypePopup("list-history");
    setScrollBlockIsActive(true);
    setViewItemId(expenseGroup.id);
  };

  return (
    <div
      className="my-4 px-4 py-3 flex bg-white dark:bg-gray-200 rounded-xl items-center cursor-pointer relative"
      onClick={openPopup}
    >
      <Icons name={expenseGroup.iconName} />

      <div className="ml-4">
        <p className="font-bold text-lg">{expenseGroup?.nombreGasto}</p>
        <p className="font-bold text-lg">{expenseGroup?.nombreDeudor}</p>
        <p className="font-semibold">Total: ${expenseGroup.total}</p>
      </div>

      <div className="absolute text-xs right-5">
        <p className="left-4">{expenseGroup.date}</p>
      </div>
    </div>
  );
};
