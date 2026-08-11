package models

import "time"

type Category struct {
	Id          int
	Alias       string
	Description string
	CreatedAt   time.Time
	UpdatedAt   *time.Time
}

type CreateCategoryRequest struct {
	Name        string
	Description string
}

type CreateCategoryResponse struct {
	NewCategory Category
}

type GetCategoriesResponse struct {
	Categories []Category
}
