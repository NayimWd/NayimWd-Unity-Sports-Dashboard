import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { setCredentials } from "../../features/auth/authSlice";
import { useRefreshTokenQuery } from "../../features/auth/authApi";

const UseAuthInit = () => {
  const dispatch = useDispatch();

  const { data: user, isSuccess } = useRefreshTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess && (user as any)?.data) {
      dispatch(setCredentials((user as any).data)); // <- .data.data because server returns { success, message, data }
    }
  }, [user, isSuccess, dispatch]);

  return null; // prevent accidental UI rendering
};

export default UseAuthInit;