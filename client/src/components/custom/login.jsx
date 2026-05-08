import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { loginUser, clearAuthState } from "../../store/slice/authSlice"

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  // Redirect to home on successful login
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Sign in to your account to continue
            </p>
          </div>

          {/* API error from Redux */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-100">
              <p className="text-sm text-rose-500">{error}</p>
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-zinc-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("username", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={cn(
                    "pl-9 rounded-xl border-zinc-200 focus-visible:ring-zinc-900 h-11",
                    errors.email && "border-rose-400 focus-visible:ring-rose-400"
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <PasswordInput
                  id="password"
                  placeholder="••••••••"
                  registration={register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  hasError={!!errors.password}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white font-semibold text-sm mt-2 transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Reusable password input with show/hide toggle ──
function PasswordInput({ id, placeholder, registration, hasError }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
      <Input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...registration}
        className={cn(
          "pl-9 pr-10 rounded-xl border-zinc-200 focus-visible:ring-zinc-900 h-11",
          hasError && "border-rose-400 focus-visible:ring-rose-400"
        )}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </>
  );
}
