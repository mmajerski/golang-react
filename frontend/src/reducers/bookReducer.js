import * as types from "../actions/types";

const initialState = {
  books: [],
  error: null,
  isLoading: false
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.payload };
    case types.FETCH_BOOKS_LOADING:
      return { ...state, isLoading: action.payload };
    case types.FETCH_BOOKS_ERROR:
      return { ...state, error: action.payload };
    case types.ADD_BOOK_SUCCESS:
      return { ...state, books: [...state.books, action.payload] };
    case types.EDIT_BOOK_SUCCESS:
      const updatedBooks = state.books.filter(
        (book) => book.id !== action.payload.id
      );
      return { ...state, books: [...updatedBooks, action.payload] };
    case types.DELETE_BOOK_SUCCESS:
      const newBooks = state.books.filter((book) => book.id !== action.payload);
      return { ...state, books: newBooks };
    default:
      return state;
  }
};

export default bookReducer;
