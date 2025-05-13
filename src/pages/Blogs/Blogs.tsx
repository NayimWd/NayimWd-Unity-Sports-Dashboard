import { useGetBlogsQuery } from "../../features/blog/blogApi"

const Blogs = () => {

  // fetch blog
  const {data: blogs} = useGetBlogsQuery({});

  // console.log(blogs.data.blogs)

  return (
    <div>Blogs</div>
  )
}

export default Blogs