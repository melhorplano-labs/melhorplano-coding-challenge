export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number
): Paginated<T> {
  if (pageSize === Infinity) {
    return {
      items,
      totalPages: 1,
      total: items.length,
      page: 1,
      pageSize: items.length,
    };
  }

  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const sliced = items.slice(start, end);

  return { items: sliced, total, totalPages, pageSize, page };
}
