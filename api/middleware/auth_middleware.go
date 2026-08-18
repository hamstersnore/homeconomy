package middleware

import (
	"errors"
	"log"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func AuthHttpHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		token, err := jwt.Parse(
			tokenString,
			func(t *jwt.Token) (any, error) {
				key := os.Getenv("SIGNING_KEY")
				return []byte(key), nil
			},
			jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
		if err != nil {
			if errors.Is(err, jwt.ErrTokenExpired) {
				log.Println("TOKEN EXPIRED")
				w.WriteHeader(http.StatusUnauthorized)
			}
			log.Print(err.Error())
		}
		log.Println(token)
		next.ServeHTTP(w, r)
	})
}
