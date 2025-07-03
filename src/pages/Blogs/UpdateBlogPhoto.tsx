import { useParams } from "react-router-dom"

const UpdateBlogPhoto = () => {

  const { blogId } = useParams();

  return (
    <div>
      <p>{blogId}</p>
      UpdateBlogPhoto
    </div>
  )
}

export default UpdateBlogPhoto