package driver

import (
	"database/sql"

	"github.com/lib/pq"
	"github.com/userq11/go-rest/utils"
)

var db *sql.DB

func ConnectDB(connString string) *sql.DB {
	pgURL, err := pq.ParseURL(connString)
	utils.LogFatal(err)

	db, err = sql.Open("postgres", pgURL)
	utils.LogFatal(err)

	err = db.Ping()
	utils.LogFatal(err)

	return db
}
