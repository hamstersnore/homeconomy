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
	r.HandleFunc("/health", handlers.HealthHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/auth/sign-up", handlers.SignUpHandler).Methods("POST")
	r.HandleFunc("/auth/sign-in", handlers.SignInHandler).Methods("POST")
	r.HandleFunc("/transactions", handlers.CreateTransaction).Methods("POST")
	r.HandleFunc("/transactions", handlers.GetTransactions).Methods("GET")
	r.HandleFunc("/accounts", handlers.GetAccountsHandler).Methods("GET")
	r.HandleFunc("/accounts", handlers.CreateAccountHandler).Methods("POST")

	const PORT = ":8086"

	log.Printf("listening on %s\n", PORT)

	log.Fatal(http.ListenAndServe(PORT, r))
}
