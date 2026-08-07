export interface Account {
    id: number
    owner_id: number
    alias: string
    created_at: Date,
    updated_at: Date | null
}