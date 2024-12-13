import React from "react";
import { Logo, Input, Button } from "./components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
function SignupForm() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="flex items-center justify-center mt-10">
      <div
        className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}
      >
        <div className=" mt-8 -ml-5">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign Up To Create Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            LogIn
          </Link>
        </p>
        {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

        <form>
          <div className="space-y-5">
            <Input
              label="Shop Name: "
              placeholder="Enter your shop name"
              className="border-gray-200 border-2"
              {...register("shopname", {
                required: true,
              })}
            />
            <Input
              label="Owner Name: "
              placeholder="Enter Shop Owner name"
              className="border-gray-200 border-2"
              {...register("ownername", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              className="border-gray-200 border-2"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              className="border-gray-200 border-2"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold border rounded-md py-2"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
