import { z } from "zod"
import { useNavigate } from "react-router-dom";
import { useCreateBlogMutation } from "../../features/blog/blogApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../../utils/Schema";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import FormContainer from "../../component/common/Form/FormContainer";
import PhotoArrayInput from "../../component/common/input/PhotoArrayInput";
import TextInput from "../../component/common/input/TextInput";
import TextAreaInput from "../../component/common/input/TextAreaInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import ToggleInput from "../../component/common/input/ToggleInput";
import Buttons from "../../component/common/Buttons";
import { Plus } from "lucide-react";

type blogType = z.infer<typeof blogSchema>;

export const UpdateBlogDetails = () => {

   // post blog api throw apiSlice
    const [createBlog, { isLoading }] = useCreateBlogMutation();
  
    // navigate
    const navigate = useNavigate();
  
    const methods = useForm<blogType>({
      resolver: zodResolver(blogSchema),
      mode: "onSubmit"
    })
  
    let tags = [
      { label: "news", value: "news" },
      { label: "highlight", value: "highlight" },
      { label: "tournaments", value: "tournaments" },
      { label: "awards", value: "awards" }
    ];
  
    const handleSubmit = async (data: blogType) => {
      const loadingId = LoadingToast({ msg: "Creating Blog..." });
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("tags", data.tags);
        formData.append("isPublished", data.isPublished.toString());
        formData.append("content", data.content);
        if (data.photo && Array.isArray(data.photo) && data.photo.length > 0) {
          formData.append("photo", data.photo[0]);
        }
  
        await createBlog(formData).unwrap();
        toast.dismiss(loadingId);
        SuccessToast({ msg: "Blog Posted Successfully" })
        methods.reset();
        navigate("/dashboard/blogs")
  
      } catch (error) {
        toast.dismiss(loadingId);
        ErrorToast({ msg: "Blog Posted Failed!" })
      }
    }
  

  return (
    <div className="w-full">
      <h1 className="paddingX text-center text-2xl sm:text-3xl md:text-4xl mt-5 font-semibold text-font font-merriweather">Edit Blogs</h1>
      <div className="paddingX w-full max-w-5xl mx-auto bg-surface  py-12 px-6 rounded shadow-sm">
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 paddingX">
          <PhotoArrayInput label="Image" name="photo" className="" />
          <TextInput name="title" label="Title" placeholder="Write Title" />
          <TextAreaInput label="Blog" placeholder="Write Your Blog" name="content" height="min-h-[300px]" />
          <div className="flex justify-between items-center flex-wrap gap-5">
            <DropdownInput label="Tags" name="tags" placeholder="Select an option" options={tags} />
            <ToggleInput label="Publish" name="isPublished" />
          </div>
          <Buttons disabled={isLoading} iconRight={<Plus size={16} />} variant="primary" className=" rounded">Create</Buttons>
        </FormContainer>
      </div>
    </div>
  )
}
