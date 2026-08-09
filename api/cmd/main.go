package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/hamstersnore/homeconomy/database"
	api "github.com/hamstersnore/homeconomy/handlers"
	_ "github.com/lib/pq"
)

func main() {

	db := database.OpenDb()

	defer db.Close()

	r := mux.NewRouter()
	r.HandleFunc("/health", api.HealthHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/auth/sign-up", api.SignUpHandler).Methods("POST")
	r.HandleFunc("/auth/sign-in", api.SignInHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/transactions", api.CreateTransaction).Methods("POST")
	r.HandleFunc("/transactions", api.GetTransactions).Methods("GET")
	r.HandleFunc("/accounts", api.GetAccountsHandler).Methods("GET")
	r.HandleFunc("/accounts", api.CreateAccountHandler).Methods("POST")

	originsOk := handlers.AllowedOrigins([]string{"http://localhost:4200"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS", "PUT", "DELETE"})
	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Authorization", "X-Requested-With"})

	const PORT = ":8086"

	log.Printf("listening on %s\n", PORT)

	log.Fatal(http.ListenAndServe(PORT, handlers.CORS(originsOk, methodsOk, headersOk)(r)))
}
