interface Props {
  post: {
    id: number
    title: string
    body: string
  }
}

export default function Post({ post }: Props) {
  return (
    <div className="group transition-all duration-300 hover:shadow-lg">
      <div className="pb-3">
        <div className="text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {post.title}
        </div>
      </div>
      <div className="space-y-4">
        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
          {post.body}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Post #{post.id}</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-950">
            Read More
          </div>
        </div>
      </div>
    </div>
  )
}
