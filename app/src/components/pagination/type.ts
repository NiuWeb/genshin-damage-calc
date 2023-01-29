export interface PaginationProps<T> { 
    /** Items to paginate */
    items: T[]
    /** Items per page */
    pageSize?: number
}