import { z } from "zod";
import { useForm } from "react-hook-form";
import FormContainer from "../../component/Form/FormContainer";
import PasswordInput from "../../component/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, Mail, User2 } from "lucide-react";
import Buttons from "../../component/common/Buttons";
import TextInput from "../../component/input/TextInput";
import EmailInput from "../../component/input/EmailInput";
import DropdownInput from "../../component/input/DropdownInput";
import { registrationSchema } from "../../utils/Schema";
import PhotoInputProps from "../../component/input/PhotoInputProps";

type FormValues = z.infer<typeof registrationSchema>;

const RegistrationForm = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onSubmit",
    defaultValues: {
      role: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    console.log("Submitted", data);
    methods.reset();
  };

  const dropdownOptions = [
    { label: "player", value: "player" },
    { label: "manager", value: "manager" },
    { label: "umpire", value: "umpire" },
  ];

  return (
    <div className="background w-full min-h-screen py-10 paddingX  flex items-center justify-center">
      <FormContainer
        methods={methods}
        onSubmit={handleSubmit}
        className="formWrapper"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-font uppercase leading-7 tracking-wide mb-1">
            sign In
          </h2>
          <p className="text-sm sm:text-base text-subtext">Register Account</p>
        </div>
        <TextInput
          name="name"
          label="Name"
          icon={<User2 size={16} />}
          placeholder="Inter Your Name"
        />
        <EmailInput
          name="email"
          label="Email"
          icon={<Mail size={16} />}
          placeholder="Your email"
        />
        <PasswordInput
          name="password"
          label="Password"
          icon={<LockIcon size={16} />}
          placeholder="Your password"
        />

        <DropdownInput
          name="role"
          label="select role"
          placeholder="Select your role"
          options={dropdownOptions}
        />

        <PhotoInputProps
          name="photo"
          label="Upload your photo"
          placeholder="Image"
          className="cursor-pointer"
        />
        <Buttons
          className="w-full mt-3 rounded"
          type="submit"
          variant="gradient"
        >
          {" "}
          Submit{" "}
        </Buttons>
      </FormContainer>
    </div>
  );
};

export default RegistrationForm;
