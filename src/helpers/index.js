export const generateId = () => {
  const random = Math.random().toString(36).slice(2);
  const date = Date.now().toString(36).slice(2);

  return random + date;
};

export const dateFormat = (dateProp) => {
  const date = new Date(dateProp);
  const config = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return date.toLocaleDateString("es-MX", config);
};

export const dateShort = (dateProp) => {
  const date = new Date(dateProp);
  const config = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return date.toLocaleDateString("es-MX", config);
};

export const currencyFormat = (amount) => {
  return amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};

export const animateScroll = (element, onlyMobile = true) => {
  const destination = document.querySelector(element);
  const device = navigator.userAgent.match(/Mobile/gi);

  if (onlyMobile && Array.isArray(device)) {
    destination.scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  if (!onlyMobile) {
    destination.scrollIntoView({
      behavior: "smooth",
    });
  }
};

export const percentageMeter = (porcentajeUsado) => {
  if (porcentajeUsado < 85) return "#3b82f6";

  if (porcentajeUsado <= 100) return "#EBE533";

  if (porcentajeUsado > 100) return "#DC2626";
};

export const randomElement = (datos) => {
  if (!Array.isArray(datos)) {
    throw TypeError("El argumento debe ser un arreglo.");
  }

  if (!datos.length) {
    return null;
  }

  let indiceAleatorio = Math.floor(Math.random() * datos.length);

  return datos[indiceAleatorio];
};

export const formatTextForWhatsApp = (text) => {
  let textWa = "";

  if (text.includes(" ")) textWa = text.replace(/ /g, "%20"); //ESPACIOS
  if (text.includes("<")) textWa = textWa.replace(/</g, "%0A"); //ENTER
  if (text.includes("#")) textWa = textWa.replace(/#/g, "```"); //MONOESPACIADO

  return textWa;
};
