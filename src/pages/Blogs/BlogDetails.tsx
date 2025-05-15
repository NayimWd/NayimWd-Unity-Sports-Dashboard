import { useParams } from "react-router-dom"
import Banner from "../../component/common/banner/Banner";


const BlogDetails = () => {
    const {blogId} = useParams();

    

    console.log(blogId)

  return (
    <div className="w-full">
      <Banner pageText="Blog Details" navText="Blog"/>
      <p className="text-font">{blogId}</p>
      BlogDetails
      </div>
  )
}

export default BlogDetails