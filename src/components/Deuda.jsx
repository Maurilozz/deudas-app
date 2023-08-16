import { currencyFormat } from "../helpers";

export const Deuda = ({
  expense,
  debtor = false,
  setEditExpense,
  setNuevoGasto,
}) => {
  const { nombreGasto, cantidad, fecha, dividir, id } = expense;
  return (
    <>
      {debtor ? (
        // <li className="flex items-center my-4 md:my-2">
        //   <p className="text-md w-4/12">{nombreGasto}</p>
        //   <p className="relative w-4/12">
        //     {currencyFormat(Number(cantidad) / Number(dividir))}
        //     {dividir > 1 && (
        //       <span className="text-xs absolute top-0">x{dividir}</span>
        //     )}
        //   </p>
        //   <p className="w-3/12">{fecha}</p>
        //   <i
        //     className="bi bi-trash3 w-1/12 text-rose-600 cursor-pointer text-lg"
        //     // onClick={() => eliminarDeuda(id)}
        //   ></i>
        // </li>

        <li className="flex items-center my-4 md:my-2 relative w-full">
          <p className="text-md w-4/12 text-green-600">{nombreGasto}</p>
          <p className="relative w-4/12 text-green-600">
            -{currencyFormat(Number(cantidad) / Number(dividir))}
            {dividir > 1 && (
              <span className="text-xs absolute top-0">x{dividir}</span>
            )}
          </p>
          <p className="w-4/12 text-green-600">{fecha}</p>
        </li>
      ) : (
        <li className="flex items-center my-4 md:my-2 w-full">
          <p className="text-md w-2/6">{nombreGasto}</p>
          <p className="relative w-2/6">
            {currencyFormat(Number(cantidad) / Number(dividir))}
            {dividir > 1 && (
              <span className="text-xs absolute top-0">x{dividir}</span>
            )}
          </p>

          <p className="w-2/6">{fecha}</p>

          {/* <span
            className=" absolute material-symbols-outlined text-xs right-0 md:right-5 md:text-base cursor-pointer"
            onClick={() => {
              setEditExpense(expense), setNuevoGasto(true);
            }}
          >
            edit
          </span> */}
        </li>
      )}
    </>
  );
};
