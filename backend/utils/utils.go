package utils

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/userq11/go-rest/model"
)

func LogFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func SendError(w http.ResponseWriter, status int, err model.Error) {
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(err)
}

func SendSuccess(w http.ResponseWriter, data interface{}) {
	json.NewEncoder(w).Encode(data)
}
