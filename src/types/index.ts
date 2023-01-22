export type UserType = {
    "id": string
    "created": string
    "name": string
    "gym_id": string
    "photo": string
    "addDesc": string
    "trainerCode": string
    "instagramRef": string
    "user_info": string
}

export type SortType = {
    order: 'asc' | 'desc'
    column: string
}

export type FiltersType = {
    dateFrom: string
    dateTo: string
    page: number
    limit: number
    search?: string
    searchColumns?: string[]
    sort?: SortType
}

export type UIType = {
    shownColumns?: string[]
    dateFormat: string
}