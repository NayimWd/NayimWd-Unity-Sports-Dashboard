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

const schema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .refine((val) => val !== "", {
      message: "Name is required",
    }),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
  role: z
    .string()
    .refine((val) => ["player", "manager", "umpire"].includes(val), {
      message: "Please select a role",
    }),
});

type FormValues = z.infer<typeof schema>;

const RegistrationForm = () => {    
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    }
  });

  const handleSubmit = (data: FormValues) => {
    console.log("hit");
    console.log("Submitted", data);
  };

  const dropdownOptions = [
    { label: "player", value: "player" },
    { label: "manager", value: "manager" },
    { label: "umpire", value: "umpire" },
  ];

  return (
    <div className=" w-full bg-bg flex h-screen items-center justify-center">
      <FormContainer
        methods={methods}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md mx-auto p-3 sm:p-4 md:p-6 rounded-lg bg-surface shadow-md "
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-font">Login</h2>
          <p className="text-sm text-subtext">Access your dashboard</p>
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
          label="role"
          placeholder="Select your role"
          options={dropdownOptions}
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
