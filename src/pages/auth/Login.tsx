import z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "../../component/Form/FormContainer";
import EmailInput from "../../component/input/EmailInput";
import { Lock, Mail } from "lucide-react";
import PasswordInput from "../../component/input/PasswordInput";
import Buttons from "../../component/common/Buttons";

type LoginType = z.infer<typeof loginSchema>;

const Login = () => {
  const methods = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const handleSubmit = (data: LoginType) => {
    console.log(data);
    methods.reset();
  };

  return (
    <div className="background h-screen flexCenter paddingX">
      <FormContainer
        methods={methods}
        onSubmit={handleSubmit}
        className="formWrapper"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-font">
            Login
          </h2>
          <p className="text-sm text-subtext">Access your dashboard</p>
        </div>
        <EmailInput
          name="email"
          label="Ener your email"
          placeholder="Enter your email"
          icon={<Mail size={16} />}
        />
        <PasswordInput
          name="password"
          label="Enter your password"
          placeholder="Enter your password"
          icon={<Lock size={16} />}
        />
        <Buttons
          variant="gradient"
          type="submit"
          className="w-full mt-4 rounded"
        >
          Login
        </Buttons>
      </FormContainer>
    </div>
  );
};

export default Login;
