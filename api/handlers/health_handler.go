package handlers

import (
	"log"
	"net/http"
)

func HealthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	_, err := w.Write([]byte("healthy"))
	if err != nil {
		log.Fatal(err)
	}
}
