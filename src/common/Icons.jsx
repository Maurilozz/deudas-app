export const Icons = ({ name }) => {
  return (
    <>
      {name === "business" && (
        <div className="bg-red-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            add_business
          </span>
        </div>
      )}

      {name === "food" && (
        <div className="bg-lime-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            restaurant
          </span>
        </div>
      )}

      {name === "rent" && (
        <div className="bg-yellow-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            real_estate_agent
          </span>
        </div>
      )}

      {name === "shopping" && (
        <div className="bg-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            shopping_cart
          </span>
        </div>
      )}

      {name === "recreation" && (
        <div className="bg-sky-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sports_esports
          </span>
        </div>
      )}

      {name === "health" && (
        <div className="bg-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            health_metrics
          </span>
        </div>
      )}

      {name === "gas" && (
        <div className="bg-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            local_gas_station
          </span>
        </div>
      )}

      {name === "service" && (
        <div className="bg-slate-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            design_services
          </span>
        </div>
      )}

      {name === "user1" && (
        <div className="bg-yellow-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_very_satisfied
          </span>
        </div>
      )}

      {name === "user2" && (
        <div className="bg-slate-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_neutral
          </span>
        </div>
      )}

      {name === "user3" && (
        <div className="bg-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_neutral
          </span>
        </div>
      )}

      {name === "user4" && (
        <div className="bg-green-600 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_neutral
          </span>
        </div>
      )}

      {name === "user5" && (
        <div className="bg-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_dissatisfied
          </span>
        </div>
      )}

      {name === "user6" && (
        <div className="bg-violet-600 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_dissatisfied
          </span>
        </div>
      )}

      {name === "user7" && (
        <div className="bg-amber-700 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_dissatisfied
          </span>
        </div>
      )}

      {name === "user8" && (
        <div className="bg-rose-900 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_extremely_dissatisfied
          </span>
        </div>
      )}

      {name === "user9" && (
        <div className="bg-blue-700 w-14 h-14 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined fill text-white text-4xl">
            sentiment_stressed
          </span>
        </div>
      )}
    </>
  );
};
