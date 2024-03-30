export type User = {
    full_name: string
    password: string
    email: string
    avatar?: string | null
    role: string
    refresh_token?: string | null

}