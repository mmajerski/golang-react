import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { createBook } from "../actions/book.actions";

const CreateBookStyled = styled.div`
  padding: 10%;
`;

const CreateBook = (props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ id: 0, title: "", author: "", year: "" });

  useEffect(() => {
    if (props.location && props.location.state) {
      setForm({ ...form, ...props.location.state.book });
    }
  }, [props, props.location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBook(form));
  };

  const handleValueChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm({ title: "", author: "", year: "" });
  };

  return (
    <CreateBookStyled>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter Title"
            value={form.title}
            onChange={handleValueChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="author"
            placeholder="Enter Author"
            value={form.author}
            onChange={handleValueChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="year"
            placeholder="Enter Year Published"
            value={form.year}
            onChange={handleValueChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={handleReset}
          >
            Cancel
          </button>
        </div>
      </form>
    </CreateBookStyled>
  );
};

export default CreateBook;
