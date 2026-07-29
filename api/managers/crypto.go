package managers

import (
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
