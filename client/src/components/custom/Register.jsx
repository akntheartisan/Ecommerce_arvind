import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  ShoppingBag,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import client from "@/config/api";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthState } from "../../store/slice/authSlice";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  console.log("registererror", error);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const passwordValue = watch("password", "");
  const confirmValue = watch("confirmPassword", "");

  const passwordsMatch = confirmValue && passwordValue === confirmValue;

  useEffect(() => {
    if (error) {
      const errorKey = Object.keys(error);

      errorKey.forEach((each) =>
        setError(each, {
          type: "manual",
          message: error[each],
        }),
      );
    }
  }, [error]);

  const onSubmit = async (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Join us and start shopping today
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={cn(
                    "pl-9 rounded-xl border-zinc-200 focus-visible:ring-zinc-900 h-11",
                    errors.name &&
                      "border-rose-400 focus-visible:ring-rose-400",
                  )}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700"
              >
                email
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
                    errors.email &&
                      "border-rose-400 focus-visible:ring-rose-400",
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500">{errors.email.message}</p>
              )}
            </div>

            {/* Phone (optional) */}
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-zinc-700"
              >
                Phone{" "}
                <span className="text-zinc-400 font-normal">(optional)</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  {...register("phone", {
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Enter a valid 10-digit number",
                    },
                  })}
                  className={cn(
                    "pl-9 rounded-xl border-zinc-200 focus-visible:ring-zinc-900 h-11",
                    errors.phone &&
                      "border-rose-400 focus-visible:ring-rose-400",
                  )}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className={cn(
                    "pl-9 pr-10 rounded-xl border-zinc-200 focus-visible:ring-zinc-900 h-11",
                    errors.password &&
                      "border-rose-400 focus-visible:ring-rose-400",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-rose-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-zinc-700"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === passwordValue || "Passwords do not match",
                  })}
                  className={cn(
                    "pl-9 pr-10 rounded-xl border-zinc-200 focus-visible:ring-zinc-900 h-11",
                    errors.confirmPassword &&
                      "border-rose-400 focus-visible:ring-rose-400",
                    !errors.confirmPassword &&
                      passwordsMatch &&
                      "border-emerald-400",
                  )}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-rose-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white font-semibold text-sm transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
