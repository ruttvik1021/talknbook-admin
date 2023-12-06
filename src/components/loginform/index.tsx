"use client";

import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import TextField, { fieldTypeEnums } from "../textField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import LoadingButton from "../loadingButton";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const emailSchema = yup.object({
    email: yup.string().email().required("Required"),
  });
  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit(values) {
      mutation.mutate();
    },
  });

  const sendOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/otp/sendotp",
        emailFormik.values
      );
      return response.data; // Adjust based on your API response structure
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: sendOTP, // Wrap your function in the "mutationFn" property
    onSuccess: () => alert("Hey"),
    onError: () => alert("Error"),
  });

  return (
    <>
      <Card className="card w-full md:w-2/3 lg:w-1/3">
        <CardHeader>
          <CardTitle>Talk N Book</CardTitle>
          <button onClick={() => setLoading(!loading)}>Loading</button>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-3">
            Hello Admin, just a step to verify you.
          </CardDescription>
          <form onSubmit={emailFormik.handleSubmit}>
            <FormikProvider value={emailFormik}>
              <TextField
                type={fieldTypeEnums.TEXT}
                name={"email"}
                placeholder={"Email"}
                disabled={loading}
                required
              />
              <div className="flex justify-end">
                <LoadingButton
                  text={"Send OTP"}
                  onClick={() => emailFormik.handleSubmit()}
                  isLoading={loading}
                  className="bg-theme"
                  variant={"outline"}
                />
              </div>
            </FormikProvider>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginComponent;
