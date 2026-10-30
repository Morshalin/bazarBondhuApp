import { useCallback, useReducer } from "react";
import axios from "axios";

const useHttpReducerInitialState = {
  isLoading: false,
  success: false,
  successMessage: null,
  data: null,
  error: null,
  errorMessage: null,
};

const useHttpReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_SEND":
      return {
        ...state,
        isLoading: true,
        success: false,
        successMessage: null,
        data: null,
        error: null,
        errorMessage: null,
      };
    case "REQUEST_RESPONSE":
      return {
        ...state,
        isLoading: false,
        success: action.success,
        successMessage: action.successMessage,
        data: action.data,
        error: null,
        errorMessage: null,
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        isLoading: false,
        success: false,
        successMessage: null,
        error: action.error ?? "Something Went Wrong!",
        errorMessage: action.errorMessage ?? "Something Went Wrong!",
      };
    case "REQUEST_SUCCESS_CLEAR":
      return {
        ...state,
        success: false,
        successMessage: null,
      };
    case "REQUEST_ERROR_CLEAR":
      return {
        ...state,
        error: null,
        errorMessage: null,
      };
    case "RESET":
      return useHttpReducerInitialState;

    default:
      throw new Error("HTTP Error");
  }
};

export default function useHttp() {
  const [httpState, dispatchHttpState] = useReducer(
    useHttpReducer,
    useHttpReducerInitialState
  );

  const httpFetchHandler = useCallback(
    async (urlData, methodData, bodyData, headersData) => {
      dispatchHttpState({ type: "REQUEST_SEND" });
      try {
        const response = await axios({
          url: urlData,
          method: methodData,
          data: bodyData,
          headers: headersData,
        });
        // console.log(response);
        if (response.data.success === false) {
          dispatchHttpState({
            type: "REQUEST_ERROR",
            error: response.data.errors,
            errorMessage: response.data.message,
          });
        } else if (response.data.success === true) {
          dispatchHttpState({
            type: "REQUEST_RESPONSE",
            data: response.data.data,
            success: response.data.success,
            successMessage: response.data.message,
          });
        } else {
          dispatchHttpState({
            type: "REQUEST_ERROR",
          });
        }
      } catch (error) {
        //   dispatchHttpState({
        //     type: "REQUEST_ERROR",
        //     errorMessage: error.message,
        //   });
      }
    },
    []
  );

  const clearHttpSuccessHandler = useCallback(() => {
    dispatchHttpState({ type: "REQUEST_SUCCESS_CLEAR" });
  }, []);

  const clearHttpErrorHandler = useCallback(() => {
    dispatchHttpState({ type: "REQUEST_ERROR_CLEAR" });
  }, []);

  const resetHttpHandler = useCallback(() => {
    dispatchHttpState({ type: "RESET" });
  }, []);

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    httpFetch: httpFetchHandler,
    success: httpState.success,
    successMessage: httpState.successMessage,
    error: httpState.error,
    errorMessage: httpState.errorMessage,
    clearSuccess: clearHttpSuccessHandler,
    clearError: clearHttpErrorHandler,
    resetHttp: resetHttpHandler,
  };
}
