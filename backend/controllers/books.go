package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/userq11/go-rest/model"
	bookRepository "github.com/userq11/go-rest/repository/book"
	"github.com/userq11/go-rest/utils"
)

type Controller struct{}

var books []model.Book

func (c Controller) GetBooks(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var book model.Book
		books = []model.Book{}

		bookRepo := bookRepository.BookRepo{}
		books, err := bookRepo.GetBooks(db, book, books)
		utils.LogFatal(err)

		json.NewEncoder(w).Encode(books)
	}
}

func (c Controller) GetBookById(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		var book model.Book

		bookRepo := bookRepository.BookRepo{}
		book, err := bookRepo.GetBookById(db, book, id)
		utils.LogFatal(err)

		json.NewEncoder(w).Encode(book)
	}
}

func (c Controller) AddBook(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var book model.Book

		json.NewDecoder(r.Body).Decode(&book)

		bookRepo := bookRepository.BookRepo{}
		bookID, err := bookRepo.AddBook(db, book)
		utils.LogFatal(err)

		json.NewEncoder(w).Encode(bookID)
	}
}

func (c Controller) UpdateBook(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var book model.Book
		json.NewDecoder(r.Body).Decode(&book)

		bookRepo := bookRepository.BookRepo{}
		rowsUpdated, err := bookRepo.UpdateBook(db, book)
		utils.LogFatal(err)

		json.NewEncoder(w).Encode(rowsUpdated)
	}
}

func (c Controller) RemoveBook(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]

		bookRepo := bookRepository.BookRepo{}
		rowsDeleted, err := bookRepo.DeleteBook(db, id)
		utils.LogFatal(err)

		json.NewEncoder(w).Encode(rowsDeleted)
	}

}
