export class CreateCommentDto {
    user_id?: number
    image_id: number
    content: string
    date_create: Date
}
