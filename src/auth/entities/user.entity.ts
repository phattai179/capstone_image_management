export type User = {
    full_name: string
    user_name: string
    password: string
    email: string
    avatar?: string | null
    role: string
    age: number
    refresh_token?: string | null

}