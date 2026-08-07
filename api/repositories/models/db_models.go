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
	Id        int
	OwnerId   int
	Alias     string
	CreatedAt time.Time
	UpdateAt  *time.Time
}

type BudgetDb struct {
	id         int
	creator_id int
	alias      string
	created_at time.Time
	updated_at *time.Time
}

type TransactionDb struct {
	id             int
	budget_id      int
	user_id        int
	amount         float32
	execution_date time.Time
	category_id    int
	created_at     time.Time
	updated_at     *time.Time
}
