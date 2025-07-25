import axios from '@/lib/axios'

type Post = {
  id: number
  title: string
  body: string
  createdAt: string
  updatedAt: string
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  nextCursor: string
}

export const postsService = {
  getPosts: async ({
    page,
    limit,
    cursor,
  }: {
    page?: number
    limit?: number
    cursor?: string
  }) => {
    const response = await axios.get<{
      posts: Post[]
      pagination: Pagination
    }>(`/posts?page=${page}&limit=${limit}&cursor=${cursor}`)
    return response.data
  },
}
