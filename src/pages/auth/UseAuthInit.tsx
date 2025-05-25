import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { setCredentials } from "../../features/auth/authSlice";
import { useCurrentUserQuery } from "../../features/auth/authApi";

const UseAuthInit = () => {
    const dispatch = useDispatch();

    const { data: user, isSuccess } = useCurrentUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    console.log(user)

    useEffect(() => {
        if (isSuccess && user._id) {
            dispatch(setCredentials((user)));
        }
    }, [user, isSuccess, dispatch]);

    return null; // For prevent accidental UI rendering
};

export default UseAuthInit;