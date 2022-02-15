import * as moment from "moment";
import "moment/locale/tr";
moment.locale("tr");

export const date = (date) => {
  var yayinlanma = moment(date).startOf("second").fromNow();
  return yayinlanma;
};

export const orjDate = (date) => {
  var momentDate = moment(date);
  const tarih = momentDate.format("DD.MM.YYYY");
  return tarih;
};

export const minToday = () => {
  var min = moment().add(1, "days").format("YYYY-MM-DD");
  return min;
};

export const formatDate = (date) => {
  var today = moment().format("YYYY-MM-DDTHH:MM:00.000Z");
  var yayinlanma = "";
  if (date < today) {
    yayinlanma = "Belirtilen Tarih Geçti";
    return yayinlanma;
  } else {
    yayinlanma = moment(date).startOf("day").fromNow();
    return yayinlanma;
  }
};

export const getDate = (date) => {
  var formated = moment(date).format("YYYY-MM-DD");
  return formated;
};
