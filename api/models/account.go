package models

type CreateAccountRequest struct {
	OwnerId      int    `json:"owner_id"`
	AccountAlias string `json:"account_alias"`
}
