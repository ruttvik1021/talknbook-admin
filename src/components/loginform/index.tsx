"use client";

import { unAuthBaseUrl, urls } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";
import LoadingButton from "../loadingButton";
import TextField, { fieldTypeEnums } from "../textField";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

const sendOtptoEmail = async (values: any) => {
  return await axios.post(unAuthBaseUrl + urls.sentOtp, values);
};
const loginFn = async (values: any) => {
  return await axios.post(unAuthBaseUrl + urls.validateOtp, values);
};

const LoginComponent = () => {
  const route = useRouter();
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const emailSchema = yup.object({
    email: yup.string().email().required("Required"),
  });
  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit(values) {
      sendOtp(values);
    },
  });
  const loginSchema = yup.object({
    otp: yup
      .string()
      .matches(/^\d{6}$/, "Must be exactly 6 digits")
      .required("Required"),
  });
  const loginFormik = useFormik({
    initialValues: {
      otp: null,
    },
    validationSchema: loginSchema,
    onSubmit(values) {
      login({ otp: Number(values.otp), email: emailFormik.values.email });
    },
  });

  const { mutate: sendOtp, isPending: isOtpPending } = useMutation({
    mutationFn: sendOtptoEmail,
    onSuccess: () => {
      setOtpSent(true);
    },
    onError: (error: any) => {
      emailFormik.setFieldError("email", error.response?.data?.message);
    },
  });
  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: loginFn,
    onSuccess: async (res: any) => {
      Cookies.set("token", res?.data?.accessToken);
      route.push("/dashboard");
    },
    onError: (error: any) => {
      loginFormik.setFieldError("otp", error.response?.data?.message);
    },
  });

  return (
    <>
      <Card className="card w-full md:w-1/3 lg:w-1/3">
        <CardHeader>
          <CardTitle>Talk N Book</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-3">
            {otpSent ? (
              <div className="flex gap-2 items-center">
                <Badge
                  variant={"outline"}
                  className="border border-red-500  cursor-pointer"
                  onClick={() => setOtpSent(false)}
                >
                  Back
                </Badge>
                <Label>{emailFormik.values.email}</Label>
              </div>
            ) : (
              "Hello Admin, just a step to verify you."
            )}
          </CardDescription>
          {!otpSent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                emailFormik.handleSubmit();
              }}
            >
              <FormikProvider value={emailFormik}>
                <TextField
                  autoFocus={true}
                  aria-label="email"
                  type={fieldTypeEnums.TEXT}
                  name={"email"}
                  placeholder={"Email"}
                  disabled={isOtpPending || otpSent}
                  required
                />
                <div className="flex justify-end mt-2">
                  <LoadingButton
                    text={"Send OTP"}
                    type="submit"
                    isloading={isOtpPending}
                    className="bg-theme"
                    variant={"outline"}
                  />
                </div>
              </FormikProvider>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginFormik.handleSubmit();
              }}
            >
              <FormikProvider value={loginFormik}>
                <TextField
                  autoFocus={true}
                  aria-label="otp"
                  type={fieldTypeEnums.PASSWORD}
                  name={"otp"}
                  placeholder={"OTP"}
                  maxLength={6}
                  disabled={isLoginPending}
                  required
                />
                <div className="flex justify-end mt-2">
                  <LoadingButton
                    text={"Login"}
                    type="submit"
                    isloading={isLoginPending}
                    className="bg-theme"
                    variant={"outline"}
                  />
                </div>
              </FormikProvider>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default LoginComponent;
