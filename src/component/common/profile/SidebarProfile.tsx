import { LogOut } from "lucide-react"
import { useCurrentUserQuery, useSignOutMutation } from "../../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredenTials } from "../../../features/auth/authSlice";
import { ErrorToast, SuccessToast } from "../../../utils/toastUtils";

const SidebarProfile = () => {
    // access signout from authApi
    const [signOut] = useSignOutMutation();
    // access current user
    const { data: user } = useCurrentUserQuery();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // logout function 
    const handleLogout = async () => {
        try {
            await signOut({}).unwrap()
            dispatch(clearCredenTials())
            navigate("/login")
            SuccessToast({ msg: "Logout Successfull" })
        } catch (error) {
            ErrorToast({ msg: "Sign Out Failed!", position: "top-center", duration: 3000 });
        }
    }
    return (
        <div className="flex w-full items-center justify-between gap-2 px-3 py-6 rounded  mb-16 shadow-xl">
            <div className="flex items-center gap-2">
                <img className="w-14 h-14 rounded-full object-cover object-center" src={user?.photo} alt="user photo" aria-label="photo" loading="lazy" />
                <div className="flex flex-col font-inter">
                    <h3 className="text-font font-semibold"> {user?.name} </h3>
                    <p className="text-sm text-subtext"> {user?.email.slice(0, 15)} </p>
                </div>
            </div>
            <LogOut className="text-toastErrorText" onClick={handleLogout} size={24} aria-label="logout button" role="button" />
        </div>
    )
}

export default SidebarProfile