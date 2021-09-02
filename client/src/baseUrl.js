import axios from "axios";

const myAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`,
});

export default myAxios;
