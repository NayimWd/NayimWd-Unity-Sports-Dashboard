import z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "../../component/common/Form/FormContainer";
import EmailInput from "../../component/common/input/EmailInput";
import { Lock, Mail } from "lucide-react";
import PasswordInput from "../../component/common/input/PasswordInput";
import Buttons from "../../component/common/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../features/auth/authApi";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

type LoginType = z.infer<typeof loginSchema>;

const Login = () => {

  // login 
  const [signIn, { isLoading }] = useSignInMutation()
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const methods = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const handleSubmit = async (data: LoginType) => {
    const loadingId = LoadingToast({ msg: "Login In-Progress" });

    try {
  
      // send login request
      const res = await signIn({ email: data.email, password: data.password }).unwrap();
      dispatch(setCredentials(res.user))
      // hide loading toast
      toast.dismiss(loadingId);
      // set success toast
      SuccessToast({ msg: "Login Success" })
      // navigate to Dashboard
      navigate("/dashboard")
    } catch (error) {
      // hide loading toast
      toast.dismiss(loadingId);
      // set success toast
      ErrorToast({ msg: "Login Failed!" })
    }

    console.log(data);
    // methods.reset();
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
            disabled={isLoading}
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
