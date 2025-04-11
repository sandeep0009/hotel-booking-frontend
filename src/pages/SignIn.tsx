import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { axiosInstance } from "../utils/axios";
import { setUser } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const onSubmit = async(data: SignInFormData) => {
    const res=await axiosInstance.post('/signin',data);
        console.log(res.status)
        if(res.status===200){
            const user=res.data.user;
            localStorage.setItem('user',JSON.stringify(user));
            dispatch(setUser(user));
            navigate('/');
        }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back 👋</CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-1">Sign in to continue</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-all" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;
