import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        const user = data?.payload?.user;
        localStorage.setItem("user", JSON.stringify(user)); // Store the user object with role
        localStorage.setItem("isAuthenticated", "true"); // Store authentication status

        toast({
          title: data?.payload?.message,
        });
        if (user?.role === "admin") {
          navigate("/admin/banner");
        } else if (user?.role === "superadmin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/shop/home");
        }
      } else {
        toast({
          title:
            data?.payload?.message || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div>
        <Link
          to="/auth/forgot-password"
          className="text-blue-500 hover:text-blue-700 hover:underline text-sm"
        >
          Forgot password ?
        </Link>
      </div>
    </div>
  );
}

export default AuthLogin;
