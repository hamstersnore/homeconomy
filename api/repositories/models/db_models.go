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
	Id             int
	budget_id      int
	User_id        int
	amount         float32
	execution_date time.Time
	category_id    int
	created_at     time.Time
	updated_at     *time.Time
}
