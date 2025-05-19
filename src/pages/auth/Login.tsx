import z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "../../component/common/Form/FormContainer";
import EmailInput from "../../component/common/input/EmailInput";
import { Lock, Mail } from "lucide-react";
import PasswordInput from "../../component/common/input/PasswordInput";
import Buttons from "../../component/common/Buttons";
import { Link } from "react-router-dom";

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
    <div className="background min-h-screen w-full flexCenter flex-col paddingX">
      <div className="formContainer bg-surface">
      <FormContainer
        methods={methods}
        onSubmit={handleSubmit}
        className="formWrapper"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-font">
            Login
          </h2>
          <p className="text-sm text-subtext mt-2">Login to access your Unity account </p>
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
      {/* link */}
      <div className="w-full px-3 sm:px-4  md:px-6 flex items-center justify-center">
        <p className="text-font">Don’t have an account? <Link to="/SignUp"> <span className="text-primary cursor-pointer"> Sign up </span> </Link> </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
