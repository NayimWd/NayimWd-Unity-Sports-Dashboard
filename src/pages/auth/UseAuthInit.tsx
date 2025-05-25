import { useDispatch } from "react-redux"
import { useCurrentUserQuery } from "../../features/auth/authApi";
import { useEffect } from "react";
import { setCredentials } from "../../features/auth/authSlice";

const UseAuthInit = () => {
    // fetch current user 
    const dispatch = useDispatch();

    const { data: user, isSuccess } = useCurrentUserQuery(undefined, { refetchOnMountOrArgChange: true })


    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setCredentials((user as any).data))
        }
    }, [user, isSuccess, dispatch])
}

export default UseAuthInit;