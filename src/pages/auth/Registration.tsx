import { z } from "zod";
import { useForm } from "react-hook-form";
import FormContainer from "../../component/common/Form/FormContainer";
import PasswordInput from "../../component/common/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, Mail, Phone, User2 } from "lucide-react";
import Buttons from "../../component/common/Buttons";
import TextInput from "../../component/common/input/TextInput";
import EmailInput from "../../component/common/input/EmailInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import { registrationSchema } from "../../utils/schema/Schema";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../features/auth/authApi";
import PhotoInput from "../../component/common/input/PhotoInputProps";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";


type FormValues = z.infer<typeof registrationSchema>;

const RegistrationForm = () => {

  // send data throw redux toolkit query
  const [signUp, { isLoading }] = useSignUpMutation();

  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onSubmit",
    defaultValues: {
      role: "",
    },
  });


  const handleSubmit = async (data: FormValues) => {
    const loadingId = LoadingToast({ msg: "Register Inprogress" })

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("phoneNumber", data.phoneNumber);
      if (data.photo) {
        formData.append("photo", data.photo);
      }
      await signUp(formData).unwrap();
      toast.dismiss(loadingId);
      SuccessToast({ msg: "success", position: "bottom-center" })
      navigate("/login")
      methods.reset();

    } catch (err) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "SignUp Failed!", position: "top-center" })
    }

  };

  const dropdownOptions = [
    { label: "player", value: "player" },
    { label: "manager", value: "manager" },
    { label: "umpire", value: "umpire" },
  ];

  return (
    <div className="background w-full min-h-screen py-5 paddingX  flex items-center justify-center">

      <div className="formContainer bg-surface">
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className="formWrapper"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-font uppercase leading-7 tracking-wide mb-1">
              sign In
            </h2>
            <p className="text-sm sm:text-base text-subtext mt-2">Let’s get you all set up so you can access your account</p>
          </div>
          <TextInput
            name="name"
            label="Name"
            icon={<User2 size={16} />}
            placeholder="Inter Your Name"
            autoComplete="name"
          />
          <EmailInput
            name="email"
            label="Email"
            icon={<Mail size={16} />}
            placeholder="Your email"
            autoComplete="usename"
          />
          <TextInput
            name="phoneNumber"
            label="Phone Number"
            icon={<Phone size={16} />}
            placeholder="Inter Your Phone Number"
            autoComplete="phonenumber"
          />
          <PasswordInput
            name="password"
            label="Password"
            icon={<LockIcon size={16} />}
            placeholder="Your password"
            autoComplete="current-password"
          />
          <DropdownInput
            name="role"
            label="select role"
            placeholder="Select your role"
            options={dropdownOptions}
          />
          <PhotoInput
            name="photo"
            label="Upload a photo"
          />
          <Buttons
            className="w-full mt-3 rounded"
            type="submit"
            variant="gradient"
            disabled={isLoading}
          >
            {" "}
            Submit{" "}
          </Buttons>
        </FormContainer>
        <div className="w-full px-3 sm:px-4  md:px-6 flex items-center justify-center">
          <p className="text-font">Already have an account? <Link to="/login"> <span className="text-primary cursor-pointer"> Sign In </span> </Link> </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
