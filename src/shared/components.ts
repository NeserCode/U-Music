export interface PaginationPages {
	total: number
	offset: number
	limit: number
}

export interface PaginationChanges {
	prev: () => void
	next: () => void
	page?: (page: number) => void
}

export interface PaginationProps {
	pages: PaginationPages
	changes?: PaginationChanges
}
