import axios from "axios";

import * as types from "./types";
import { history } from "../index";

const ROOT_URL = "https://fast-earth-02751.herokuapp.com";

const normalizeResponse = (data) => {
  const arr = data.map((item) => {
    const keys = Object.keys(item);

    keys.forEach((k) => {
      item[k.toLowerCase()] = item[k];
      delete item[k];
    });

    return item;
  });

  return arr;
};

export const fetchBooksLoading = (data) => {
  return {
    type: types.FETCH_BOOKS_LOADING,
    payload: data
  };
};

export const fetchBooksSuccess = (data) => {
  return {
    type: types.FETCH_BOOKS_SUCCESS,
    payload: data
  };
};

export const fetchBooksError = (data) => {
  return {
    type: types.FETCH_BOOKS_ERROR,
    payload: data
  };
};

export const fetchBooks = () => {
  let isLoading = true;

  return async (dispatch) => {
    dispatch(fetchBooksLoading(isLoading));

    const response = await axios.get(`${ROOT_URL}/books`);
    const normalizedData = normalizeResponse(response.data);
    dispatch(fetchBooksSuccess(normalizedData));

    isLoading = false;
    dispatch(fetchBooksLoading(isLoading));
  };
};

export const createBookSuccess = (data) => {
  return {
    type: types.ADD_BOOK_SUCCESS,
    payload: data
  };
};

export const createBook = (book) => {
  if (book.id) {
    const data = {
      id: book.id,
      title: book.title,
      author: book.author,
      year: book.year
    };

    return (dispatch) => {
      dispatch(editBook(data));
    };
  } else {
    return async (dispatch) => {
      const data = {
        title: book.title,
        author: book.author,
        year: book.year
      };

      const response = await axios.post(`${ROOT_URL}/books`, data);
      const id = response.data;
      const res = await axios.get(`${ROOT_URL}/books/${id}`);
      const data2 = res.data;
      const normalizedData = {
        id: data2.ID,
        title: data2.Title,
        author: data2.Author,
        year: data2.Year
      };
      dispatch(createBookSuccess(normalizedData));
      history.push("/");
    };
  }
};

export const editBook = (data) => {
  const id = data.id;

  return async (dispatch) => {
    await axios.put(`${ROOT_URL}/books`, data);
    const response = await axios.get(`${ROOT_URL}/books/${id}`);
    dispatch(editBookSuccess(response.data));
    history.push("/");
  };
};

export const editBookSuccess = (data) => {
  return {
    type: types.EDIT_BOOK_SUCCESS,
    payload: data
  };
};

export const deleteBook = (id) => {
  return async (dispatch) => {
    await axios.delete(`${ROOT_URL}/books/${id}`);
    dispatch(deleteBookSuccess(id));
  };
};

export const deleteBookSuccess = (id) => {
  return {
    type: types.DELETE_BOOK_SUCCESS,
    payload: id
  };
};
