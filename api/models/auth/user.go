package models

import "time"

type User struct {
	Id        int32     `json:"id"`
	Username  string    `json:"username"`
	CreatedAt time.Time `json:"created_at"`
}
