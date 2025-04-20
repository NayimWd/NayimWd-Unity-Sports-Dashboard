import { z } from "zod";
import { useForm } from "react-hook-form";
import FormContainer from "../../component/Form/FormContainer";

import PasswordInput from "../../component/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, Mail, User2 } from "lucide-react";
import Buttons from "../../component/common/Buttons";
import TextInput from "../../component/input/TextInput";
import EmailInput from "../../component/input/EmailInput";

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

const RegistrationForm = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleSubmit = (data: FormValues) => {
    console.log("hit");
    console.log("Submitted", data);
  };

  return (
    <FormContainer
      methods={methods}
      onSubmit={handleSubmit}
      className="flex flex-col gap-7 w-full max-w-md mx-auto p-6 rounded-xl bg-surface shadow-sm space-y-5"
    >
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
      <Buttons className="w-full md:w-28 mt-2 " type="submit" variant="primary">
        {" "}
        Submit{" "}
      </Buttons>
    </FormContainer>
  );
};

export default RegistrationForm;
