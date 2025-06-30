import { z } from "zod"
import { useNavigate, useParams } from "react-router-dom";
import { useBlogDetailsQuery, useUpdateBlogMutation } from "../../features/blog/blogApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBlogSchema } from "../../utils/Schema";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import FormContainer from "../../component/common/Form/FormContainer";
import TextInput from "../../component/common/input/TextInput";
import TextAreaInput from "../../component/common/input/TextAreaInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import Buttons from "../../component/common/Buttons";
import { PenLine } from "lucide-react";
import { useEffect } from "react";

type blogType = z.infer<typeof updateBlogSchema>;

const UpdateBlogDetails = () => {

  // get blog id
  const { blogId } = useParams();

  // get default content by blogId
  const { data: blog } = useBlogDetailsQuery(blogId);

  useEffect(() => {
    if (blog) {
      methods.reset({
        title: blog?.title,
        content: blog.content,
        tags: blog.tags,
      })
    }
  }, [])

  // post blog api throw apiSlice
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();


  // navigate
  const navigate = useNavigate();

  const methods = useForm<blogType>({
    resolver: zodResolver(updateBlogSchema),
    mode: "onSubmit"
  })

  let tags = [
    { label: "news", value: "news" },
    { label: "highlight", value: "highlight" },
    { label: "tournaments", value: "tournaments" },
    { label: "awards", value: "awards" }
  ];

  const handleSubmit = async (data: blogType) => {
    const loadingId = LoadingToast({ msg: "Updating Blog Details..." });
    try {
      const formData = new FormData();
      formData.append("title", data.title ?? "");
      formData.append("tags", data.tags ?? "");
      formData.append("content", data.content ?? "");

      // Log contents for debugging
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      await updateBlog({
        blogId,
        data: {
          title: data.title,
          content: data.content,
          tags: data.tags ?? "",
        }
      })
      toast.dismiss(loadingId);
      SuccessToast({ msg: "Blog Update Successfully" })
      // methods.reset();
      navigate("/dashboard/blogs")

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Blog Update Failed!" })
    }
  }


  return (
    <div className="w-full">
      <h1 className=" text-center text-2xl sm:text-3xl md:text-4xl mt-5 font-semibold text-font font-merriweather">Edit Blogs</h1>
      <div className="paddingX w-full max-w-5xl mx-auto bg-surface  py-12 px-6 rounded shadow-sm">
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 paddingX">
          <TextInput name="title" label="Title" placeholder="Write Title" />
          <TextAreaInput label="Blog" placeholder="Write Your Blog" name="content" height="min-h-[300px]" />
          <div className="flex justify-between items-center flex-wrap gap-5">
            <DropdownInput label="Tags" name="tags" placeholder="Select an option" options={tags} />
          </div>
          <Buttons disabled={isLoading} iconRight={<PenLine size={16} />} variant="primary" className="w-full md:w-32 rounded">Update</Buttons>
        </FormContainer>
      </div>
    </div>
  )
}

export default UpdateBlogDetails;