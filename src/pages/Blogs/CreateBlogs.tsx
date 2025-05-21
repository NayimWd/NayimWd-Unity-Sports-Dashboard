import { z } from "zod"
import FormContainer from "../../component/common/Form/FormContainer"
import TextAreaInput from "../../component/common/input/TextAreaInput"
import TextInput from "../../component/common/input/TextInput"
import { blogSchema } from "../../utils/Schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Buttons from "../../component/common/Buttons"
import { Plus } from "lucide-react"

type blogType = z.infer<typeof blogSchema>;

const CreateBlogs = () => {

  const methods = useForm<blogType>({
    resolver: zodResolver(blogSchema),
    mode: "onSubmit"
  })

  const handleSubmit = (data: blogType) => {
    console.log(data)
  }


  return (
    <div className="w-full">
      <h1 className="paddingX text-2xl sm:text-3xl md:text-4xl font-semibold text-font">Create Blogs</h1>
      <div className="paddingX w-full max-w-5xl mx-auto bg-surface my-20 py-12 px-6 rounded-xl shadow-sm space-y-10">
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 paddingX">
          <TextInput name="title" label="Title" placeholder="Write Title" />
          <TextAreaInput label="Blog" placeholder="Write Your Blog" name="description" height="min-h-[300px]"/>
          <Buttons iconRight={<Plus size={16}/>} variant="primary" className=" rounded">Create</Buttons>
        </FormContainer>
      </div>
    </div>
  )
}

export default CreateBlogs