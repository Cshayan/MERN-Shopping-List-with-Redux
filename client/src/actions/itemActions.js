import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";

export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  const res = await axios.get("/api/v1/items");
  dispatch({
    type: GET_ITEMS,
    payload: res.data.data,
  });
};

export const deleteItem = (id) => async (dispatch) => {
  await axios.delete(`/api/v1/items/${id}`);
  dispatch({
    type: DELETE_ITEM,
    payload: id,
  });
};

export const addItem = (newItem) => async (dispatch) => {
  const res = await axios.post("/api/v1/items", newItem);
  dispatch({
    type: ADD_ITEM,
    payload: res.data.data,
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
