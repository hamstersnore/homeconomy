export interface Category {
    Id: number
    Alias: string
    Description: string
    CreatedAt: Date
    UpdatedAt: Date | null
}

export interface CreateCategoryRequest {
    Name: string
    Description: string
}

export interface CreateCategoryResponse {
    NewCategory: Category
}

export interface GetCategoriesResponse {
    Categories: Category[]
}