import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
  try {
    const store = context.store;
    const queryClient = context.queryClient;
    const user = await queryClient.ensureQueryData({
      queryKey: ["user"],
      queryFn: getCurrentUser,
    });
    if (!user) {
      return redirect({ to: "/auth" }); // return is required
    }
    store.dispatch(login(user));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) {
      return redirect({ to: "/auth" }); // again, return redirect
    }
    return true;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return redirect({ to: "/auth" }); // FIX: return here too
  }
};
