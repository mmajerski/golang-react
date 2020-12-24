package bookrepository

import (
	"database/sql"

	"github.com/userq11/go-rest/model"
	"github.com/userq11/go-rest/utils"
)

type BookRepo struct{}

var books []model.Book

func (b BookRepo) GetBooks(db *sql.DB, book model.Book, books []model.Book) ([]model.Book, error) {
	rows, err := db.Query("SELECT * FROM books")
	utils.LogFatal(err)

	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&book.ID, &book.Title, &book.Author, &book.Year)
		utils.LogFatal(err)

		books = append(books, book)
	}

	return books, nil
}

func (b BookRepo) GetBookById(db *sql.DB, book model.Book, id string) (model.Book, error) {
	row, err := db.Query("SELECT * FROM books WHERE id = $1", id)
	utils.LogFatal(err)

	defer row.Close()

	row.Next()
	err = row.Scan(&book.ID, &book.Title, &book.Author, &book.Year)
	utils.LogFatal(err)

	return book, err
}

func (b BookRepo) AddBook(db *sql.DB, book model.Book) (int, error) {
	var bookID int

	err := db.QueryRow("INSERT INTO books(title, author, year) VALUES ($1, $2, $3) RETURNING id;", book.Title, book.Author, book.Year).
		Scan(&bookID)

	return bookID, err
}

func (b BookRepo) UpdateBook(db *sql.DB, book model.Book) (int64, error) {
	result, err := db.
		Exec("UPDATE books SET title=$1, author=$2, year=$3 WHERE id=$4 RETURNING id", &book.Title, &book.Author, &book.Year, &book.ID)

	rowsUpdated, err := result.RowsAffected()

	return rowsUpdated, err
}

func (b BookRepo) DeleteBook(db *sql.DB, id string) (int64, error) {
	result, err := db.Exec("DELETE FROM books WHERE id=$1", id)
	utils.LogFatal(err)

	rowsDeleted, err := result.RowsAffected()

	return rowsDeleted, err
}
