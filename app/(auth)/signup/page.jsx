"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../AuthLayout";
import AppButton from "../../components/AppButton";
import useForm from "@/hooks/useForm";
import useAuth from "@/hooks/useAuth";
import { validateName, validateEmailOrPhone, validatePassword } from "@/utils/validators";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();

  const { values, errors, isSubmitting, submitError, handleChange, handleSubmit } = useForm({
    initialValues: { name: "", emailOrPhone: "", password: "" },
    validate: (values) => ({
      name: validateName(values.name),
      emailOrPhone: validateEmailOrPhone(values.emailOrPhone),
      password: validatePassword(values.password),
    }),
    onSubmit: async (values) => {
      await signUp(values.emailOrPhone, values.password);
      router.push("/login");
    },
  });

  return (
    <AuthLayout>
      <h1 className="text-3xl font-semibold mb-2">Create an account</h1>
      <p className="text-text-secondary mb-8">Enter your details below</p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <Field
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Field
          name="emailOrPhone"
          placeholder="Email or Phone Number"
          value={values.emailOrPhone}
          onChange={handleChange}
          error={errors.emailOrPhone}
        />
        <Field
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        {submitError && (
          <p className="text-primary text-sm" role="alert">
            {submitError}
          </p>
        )}

        <AppButton type="submit" variant="primary" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </AppButton>

        <p className="text-center text-sm">
          Already have account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function Field({ error, ...inputProps }) {
  return (
    <div>
      <input
        {...inputProps}
        aria-invalid={!!error}
        className={`w-full border-b pb-2 outline-none bg-transparent ${
          error ? "border-primary" : "border-border focus:border-primary"
        }`}
      />
      {error && <span className="text-primary text-sm mt-1 block">{error}</span>}
    </div>
  );
}
