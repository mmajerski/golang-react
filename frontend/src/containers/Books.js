import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../index";
import Book from "../components/Book";
import { deleteBook, fetchBooks } from "../actions/book.actions";

const Books = () => {
  const books = useSelector((state) => state.booksData.books);
  const isLoading = useSelector((state) => state.booksData.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const handleEdit = (book) => {
    history.push({ pathname: `/edit/${book.id}`, state: { book } });
  };

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <Book
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
