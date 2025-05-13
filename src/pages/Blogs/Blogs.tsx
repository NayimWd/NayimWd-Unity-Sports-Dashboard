import { useGetBlogsQuery } from "../../features/blog/blogApi"
import { fontStyle } from "../../utils/ClassUtils";

const Blogs = () => {

  // fetch blog
  const {data: blogs, isLoading, error } = useGetBlogsQuery({});

  console.log(blogs?.data)
  let content = null;

  if(isLoading){
    
  }

  return (
    <div className="mt-5">
      <h1 className={`${fontStyle.pageTitle} text-font`}> Tournament Blogs </h1>
    </div>
  )
}

export default Blogs