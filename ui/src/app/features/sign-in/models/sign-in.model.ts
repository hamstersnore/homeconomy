export interface SignInResponse {
    authToken:string
}

export interface SignUpRequest {
    Username:string
    Password:string
}

export interface GetAuthenticatedUserResponse {
    Id: number
    Username: string
    CreatedAt: string
}