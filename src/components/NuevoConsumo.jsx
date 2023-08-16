import { useState } from "react";
import Tabs from "../common/Tabs";
import { FormDeuda } from "./FormDeuda";

import { FormGasto } from "./FormGasto";

export const NuevoConsumo = ({ expenses, setShowPopup }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [typeForm, setTypeForm] = useState("expenses");

  function toggleDropdown() {
    setOpenDropdown(!openDropdown);
  }

  return (
    <div>
      <Tabs setTypeForm={setTypeForm} />

      {typeForm === "expenses" && (
        <FormGasto
          setShowPopup={setShowPopup}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
        />
      )}

      {typeForm === "debtors" && (
        <FormDeuda
          setShowPopup={setShowPopup}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
        />
      )}
    </div>
  );
};
