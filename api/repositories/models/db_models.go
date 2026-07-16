package models

import "time"

type UserDb struct {
	id         int
	username   string
	hashed_pwd []byte
	created_at time.Time
	updated_at time.Time
}

type BudgetDb struct {
	id         int
	creator_id int
	alias      string
	created_at time.Time
	updated_at time.Time
}

type TransactionDb struct {
	id             int
	budget_id      int
	user_id        int
	amount         float32
	execution_date time.Time
	category_id    int
	created_at     time.Time
	updated_at     time.Time
}
