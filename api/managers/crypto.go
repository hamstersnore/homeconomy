package managers

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	_ "github.com/joho/godotenv/autoload"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(passwd string) []byte {
	bytePassword := []byte(passwd)
	hash, err := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	return hash
}

func CheckPassword(passwd string, hashedPasswd []byte) bool {
	return bcrypt.CompareHashAndPassword(hashedPasswd, []byte(passwd)) == nil
}

func GenerateJwt(userId int, username string) string {
	key := os.Getenv("SIGNING_KEY")
	log.Printf("Key from .env -> %s\n", key)
	signingKey := []byte(key)

	type HomeconomyClaims struct {
		Id       int    `json:"id"`
		Username string `json:"username"`
		jwt.RegisteredClaims
	}

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
