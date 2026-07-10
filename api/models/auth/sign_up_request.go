package models

type SignUpRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
