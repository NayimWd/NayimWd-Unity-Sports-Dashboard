

interface BlogCardProps {
    _id: string;
    title: string;
    author: string;
    tags: string;
    createdAt: string;
}

const BlogCard = ({}: BlogCardProps) => {
  return (
    <div className="">BlogCard</div>
  )
}

export default BlogCard