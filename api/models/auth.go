package models

import "time"

type SignInRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type SignInResponse struct {
	AuthToken string `json:"authToken"`
}

type SignUpRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	Id        int32     `json:"id"`
	Username  string    `json:"username"`
	CreatedAt time.Time `json:"created_at"`
}
