package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hamstersnore/homeconomy/database"
	"github.com/hamstersnore/homeconomy/handlers"
	_ "github.com/lib/pq"
)

func main() {

	db := database.OpenDb()

	defer db.Close()

	r := mux.NewRouter()
	r.HandleFunc("/health", handlers.HealthHandler)
	r.HandleFunc("/api/auth/sign-up", handlers.SignUpHandler)

	const PORT = ":8086"

	log.Printf("listening on %s\n", PORT)

	log.Fatal(http.ListenAndServe(PORT, r))
}
