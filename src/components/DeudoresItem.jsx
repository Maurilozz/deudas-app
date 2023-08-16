import { useContext } from "react";
import { Icons } from "../common/Icons";
import { StatesContext } from "../context";

export const DeudoresItem = ({
  setShowPopup,
  setTitulo,
  setTypePopup,
  setScrollBlockIsActive,
  nameIcon,
  groupDebtor,
}) => {
  const { nombreDeudor, id, total } = groupDebtor && groupDebtor;

  const { setViewItemId } = useContext(StatesContext);

  const openPopup = () => {
    setShowPopup(true);
    setTitulo(nombreDeudor);
    setTypePopup("list-debtors");
    setScrollBlockIsActive(true);
  };

  return (
    <div
      className="my-4 px-4 py-3 flex bg-white dark:bg-gray-200 rounded-xl items-center cursor-pointer"
      onClick={() => {
        openPopup(), setViewItemId(id);
      }}
    >
      <Icons name={nameIcon} />

      <div className="ml-4">
        <p className="font-bold text-lg">{nombreDeudor}</p>
        <p className="font-semibold">Total: ${total}</p>
      </div>

      {/* <div className="relative text-xs">
        <p className="left-4 absolute">12/02/2023</p>
      </div> */}
    </div>
  );
};
