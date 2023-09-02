export function formatDate(fecha) {
  const fechaUTC = new Date(fecha);
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const diasSemana = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const meses = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fechaLocal = new Date(fechaUTC);

  const nombreDiaSemana = diasSemana[fechaLocal.getUTCDay()];
  const nombreMes = meses[fechaLocal.getUTCMonth()];

  const dia = fechaLocal.getUTCDate();
  const año = fechaLocal.getUTCFullYear();

  return `${nombreDiaSemana}, ${nombreMes} ${dia}, year ${año}`;
}

//console.log(formatDate("2023-09-02"));
