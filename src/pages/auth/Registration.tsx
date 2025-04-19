import {z} from "zod";
import { useForm } from "react-hook-form";
import FormContainer from "../../component/Form/FormContainer";

import PasswordInput from "../../component/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

const RegistrationForm = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted", data);
  };

  return (
    <FormContainer methods={methods} onSubmit={onSubmit} className="space-y-4">
     
      <PasswordInput name="password" label="Password" placeholder="Your password" />
      <button type="submit" className="btn-primary">Register</button>
    </FormContainer>
  );
};

export default RegistrationForm;