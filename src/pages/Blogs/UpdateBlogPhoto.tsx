import { useParams } from "react-router-dom"
import FormContainer from "../../component/common/Form/FormContainer";
import PhotoArrayInput from "../../component/common/input/PhotoArrayInput";

const UpdateBlogPhoto = () => {
  // blog id
  const { blogId } = useParams();

  

  return (
    <div className="w-full">
      <h1 className=" text-center text-2xl sm:text-3xl md:text-4xl mt-5 font-semibold text-font font-merriweather">Edit Blogs Photo</h1>
      <div className="paddingX w-full max-w-5xl mx-auto bg-surface  py-12 px-6 rounded shadow-sm">
          <FormContainer >
            <PhotoArrayInput label="Image" name="photo" className="" />
          </FormContainer>
      </div>
    </div>
  )
}

export default UpdateBlogPhoto