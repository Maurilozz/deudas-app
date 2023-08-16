import { useState } from "react";

function Tabs({ setTypeForm }) {
  const [activeTab, setActiveTab] = useState("gastos");

  return (
    <div className="flex justify-center my-5">
      <button
        className={`px-4 py-2 rounded-tl-lg rounded-bl-lg ${
          activeTab === "gastos" ? "bg-indigo-800 text-white" : "bg-gray-200"
        }`}
        onClick={() => {
          setActiveTab("gastos"), setTypeForm("expenses");
        }}
      >
        Gastos
      </button>

      <button
        className={`px-4 py-2 rounded-tr-lg rounded-br-lg ${
          activeTab === "deudas" ? "bg-indigo-800 text-white" : "bg-gray-200"
        }`}
        onClick={() => {
          setActiveTab("deudas"), setTypeForm("debtors");
        }}
      >
        Nueva Deuda
      </button>
    </div>
  );
}

export default Tabs;
