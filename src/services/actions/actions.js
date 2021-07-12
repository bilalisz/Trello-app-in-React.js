import axios from "axios";
const url = "https://mocki.io/v1/0b876615-7741-46b7-bf9b-80b00a07272b";
export const getAssing = (url) => {
  axios
    .get(url)
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => err);
};
getAssing(url);
