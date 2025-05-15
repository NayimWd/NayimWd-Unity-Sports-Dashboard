import { useParams } from "react-router-dom"

const BlogDetails = () => {
    const {blogId} = useParams();

    console.log(blogId)

  return (
    <div className="w-full">
      <div className=" shadow flex items-center h-48 rounded-md w-full bg-bg glassBg">
					<div className="px-2 flex flex-wrap justify-start items-center gap-2 leading-7 tracking-wider sm:text-lg font-bold">
						{" "}
						<span className="text-primary"> </span>{" "}
						<span className="text-primary">
							{" "}
							Product
							<span className="text-2xl text-primary"> &#62;</span> abc
						</span>
					</div>
				</div>
      <p className="text-font">{blogId}</p>
      BlogDetails
      </div>
  )
}

export default BlogDetails