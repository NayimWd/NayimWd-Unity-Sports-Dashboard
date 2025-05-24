import { useDispatch } from "react-redux"
import { useCurrentUserQuery } from "../../features/auth/authApi";
import { useEffect } from "react";
import { setCredentials } from "../../features/auth/authSlice";

const UseAuthInit = () => {
    // fetch current user 
    const dispatch = useDispatch();

    const { data, isSuccess } = useCurrentUserQuery(undefined, { refetchOnMountOrArgChange: true })

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setCredentials(data))
        }
    }, [data, isSuccess, dispatch])
}

export default UseAuthInit;