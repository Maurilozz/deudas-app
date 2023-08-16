import { Icons } from "../common/Icons";

export const DebtorNumberItem = ({
  onSelectDebtor,
  debtor,
  selectedDebtor,
}) => {
  const { iconName, nombreDeudor, numero } = debtor;

  return (
    <a
      className={`col-span-1 p-3 flex items-center flex-col cursor-pointer ${
        debtor.id === selectedDebtor.id ? "bg-indigo-100" : ""
      }`}
      onClick={() => onSelectDebtor(debtor)}
    >
      <Icons name={iconName} />

      <div className="mt-2">
        <p className="font-bold text-lg text-center">{nombreDeudor}</p>
        <p className="text-center">+52 {numero}</p>
      </div>
    </a>
  );
};
