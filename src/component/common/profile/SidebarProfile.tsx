import { LogOut } from "lucide-react"
import { useSignOutMutation } from "../../../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredenTials } from "../../../features/auth/authSlice";
import { ErrorToast, SuccessToast } from "../../../utils/toastUtils";
import { RootState } from "../../../app/store/store";
import { apiSlice } from "../../../features/api/apiSlice";


const SidebarProfile = () => {
    // access signout from authApi
    const [signOut] = useSignOutMutation();
    // access current user
    const { user } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // logout function 
    const handleLogout = async () => {
        try {
            await signOut({}).unwrap()
            dispatch(clearCredenTials())
            dispatch(apiSlice.util.resetApiState())
            navigate("/login")
            SuccessToast({ msg: "Logout Successfull" })
        } catch (error) {
            ErrorToast({ msg: "Sign Out Failed!", position: "top-center", duration: 3000 });
        }
    }
    return (
        <div className="border-t border-border p-3 absolute left-0 bottom-0 md:bottom-14">
      <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl bg-subSurface">

        {/* Avatar */}
        {user?.photo ? (
          <img
            src={user.photo}
            alt={user?.name}
            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center
                          text-xs font-medium text-white flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-font truncate leading-tight">
            {user?.name}
          </p>
          <p className="text-[10px] text-muted truncate leading-tight mt-0.5">
            {user?.email}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-7 h-7 rounded-lg flex items-center justify-center
                     text-muted hover:text-toastErrorText hover:bg-toastErrorBg
                     transition-colors duration-150 flex-shrink-0"
          aria-label="Sign out"
        >
          <LogOut size={14} />
        </button>

      </div>
    </div>
    )
}

export default SidebarProfile