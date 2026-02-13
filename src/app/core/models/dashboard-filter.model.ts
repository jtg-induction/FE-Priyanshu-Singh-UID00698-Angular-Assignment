export interface DashBoardFilter {
  search?: string;
  tags?: string[];
  sortBy?: sortByType;
  sortOrder?: sortOrderType;
}

export type sortOrderType = 'ASC' | 'DESC';
export type sortByType = 'createdAt' | 'updatedAt' | 'title';
