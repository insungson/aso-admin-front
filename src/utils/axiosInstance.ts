import axios from "axios";
import { getAPIByEnviorment } from "@configs/api";
import { authSliceActions } from "@reducers/slices";

export const axiosInstance = axios.create({
  baseURL: getAPIByEnviorment(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setInterceptors = (navigate, dispatch) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      const { status } = response;
      if (status) {
        if (status === 401) {
          dispatch(authSliceActions.setLogout());
          navigate("/login");
        } else {
          return response;
        }
      } else {
        return response;
      }
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          navigate("/login");
        } else {
          return error.response;
        }
      } else {
        return error;
      }
    }
  );
};
