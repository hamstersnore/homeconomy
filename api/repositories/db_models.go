package repositories

import "time"

type UserDb struct {
	Id         int
	Username   string
	Hashed_pwd []byte
	Created_at time.Time
	Updated_at *time.Time
}

type AccountDb struct {
	Id        int        `json:"id"`
	OwnerId   int        `json:"owner_id"`
	Alias     string     `json:"alias"`
	CreatedAt time.Time  `json:"created_at"`
	UpdateAt  *time.Time `json:"updated_at"`
}

type BudgetDb struct {
	id         int
	creator_id int
	alias      string
	created_at time.Time
	updated_at *time.Time
}

type TransactionDb struct {
	Id            int
	AccountId     int
	UserId        int
	Concept       string
	Amount        float32
	Type          string
	ExecutionDate time.Time
	CategoryId    int
	BudgetId      *int
	CreatedAt     time.Time
	UpdatedAt     *time.Time
}

type CategoryDb struct {
	Id          int
	Alias       string
	Description *string
	CreatedAt   time.Time
	UpdatedAt   *time.Time
}
