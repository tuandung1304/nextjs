'use client'

import Post from '@/components/post'
import { postsService } from '@/services/posts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Posts() {
  const { ref, inView } = useInView()

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam }) =>
        postsService.getPosts({
          limit: 10,
          page: pageParam,
        }),
      staleTime: 1000 * 60 * 5,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : null,
    })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Latest Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore our latest articles and stories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {data?.pages.map((page) =>
            page.posts.map((post) => <Post key={post.id} post={post} />),
          )}
        </div>

        <div ref={ref} className="mt-8 flex justify-center">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Loading more posts...
              </span>
            </div>
          ) : (
            !hasNextPage && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-400 dark:text-gray-600">
                  No more posts to load
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
