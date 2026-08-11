package managers

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type HomeconomyClaims struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func GenerateJwt(userId int, username string) string {
	key := os.Getenv("SIGNING_KEY")
	log.Printf("Key from .env -> %s\n", key)
	signingKey := []byte(key)

	claims := HomeconomyClaims{
		Id:       userId,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(signingKey)
	log.Printf("jwt -> %s\n", ss)
	if err != nil {
		log.Fatal(err)
	}
	return ss
}

func GetClaims(r *http.Request) *HomeconomyClaims {
	authHeader := r.Header.Get("Authorization")
	log.Printf("auth header -> %s", authHeader)
	token, err := jwt.ParseWithClaims(authHeader, &HomeconomyClaims{}, func(token *jwt.Token) (any, error) {
		return []byte(os.Getenv("SIGNING_KEY")), nil
	})
	log.Printf("Is token valid: %v", token.Valid)

	if err != nil {
		log.Fatal(err)
	}

	claims := token.Claims.(*HomeconomyClaims)

	return claims
}
