import { Icons } from "../common/Icons";

export const SelectItem = ({ onSelectGroup, group, selectedGroups }) => {
  const { iconName, total, nombreGasto, nombreDeudor, id } = group;

  return (
    <a
      className={`col-span-1 p-3 flex items-center flex-col cursor-pointer ${
        selectedGroups.some((groupId) => group.id === groupId)
          ? "bg-indigo-100"
          : ""
      }`}
      onClick={() => onSelectGroup(id)}
    >
      <Icons name={iconName} />

      <div className="mt-2">
        <p className="font-bold text-lg text-center">{nombreGasto}</p>
        <p className="font-bold text-lg text-center">{nombreDeudor}</p>
        <p className="font-semibold">Total: ${total}</p>
      </div>
    </a>
  );
};
