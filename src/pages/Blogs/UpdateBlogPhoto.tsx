import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../component/common/Form/FormContainer";
import PhotoArrayInput from "../../component/common/input/PhotoArrayInput";
import { updateBlogPhotoSchema } from "../../utils/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import { useBlogDetailsQuery, useUpdateBlogPhotoMutation } from "../../features/blog/blogApi";
import Buttons from "../../component/common/Buttons";
import { Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import { fontStyle } from "../../utils/ClassUtils";

type updateBologPhotoType = z.infer<typeof updateBlogPhotoSchema>;

const UpdateBlogPhoto = () => {
  // blog id
  const { blogId } = useParams();

  // get blog photo from blog details
  const { data: blog } = useBlogDetailsQuery(blogId);

  // update blog photo, api slice 
  const [updateBlogPhoto, { isLoading }] = useUpdateBlogPhotoMutation();

  //  navigate
  const navigate = useNavigate();

  // form method
  const methods = useForm<updateBologPhotoType>({
    resolver: zodResolver(updateBlogPhotoSchema),
    mode: "onSubmit"
  });

  // function 
  const handleSubmit = async (data: updateBologPhotoType) => {
    const loadingId = LoadingToast({ msg: "Updating Blog Photo..." });
    try {
      const formData = new FormData();
      if (data.photo && Array.isArray(data.photo) && data.photo.length > 0) {
        formData.append("photo", data.photo[0]);
      };
      // update photo
      await updateBlogPhoto({ blogId, data: formData }).unwrap();
      toast.dismiss(loadingId);
      SuccessToast({ msg: "Blog photo updated Successfully" })
      methods.reset();
      navigate("/dashboard/blogs")

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Update Blog Photo Failed!" })
    }
  };

  return (
    <div className="w-full">
      <h1 className={`${fontStyle.pageTitle} text-center sm:text-3xl md:text-4xl my-5 font-semibold text-font font-merriweather`}>Edit Blogs Photo</h1>
      <div className="w-full max-w-5xl mx-auto bg-surface  py-12 px-6 rounded-lg shadow">
        <div>
          <h2 className="text-font font-semibold font-inter">Current Photo:</h2>
          <img src={Array.isArray(blog?.photo) ? blog?.photo[0] : blog?.photo} alt="blog photo" loading="lazy"
            className="w-full h-[420px] object-scale-down object-center transition-transform duration-300 hover:scale-105"
          />
        </div>
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 paddingX"
        >
          <PhotoArrayInput label="Image" name="photo" />
          <Buttons iconRight={<Edit2 size={16} />} disabled={isLoading}>
            Update Photo
          </Buttons>
        </FormContainer>
      </div>
    </div>
  )
}

export default UpdateBlogPhoto;