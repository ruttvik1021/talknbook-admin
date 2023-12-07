export const unAuthBaseUrl =
  process.env.ENVTYPE === "LOCAL"
    ? "http://localhost:3000"
    : process.env.DEV_BACKEND_URL;

export const authBaseUrl =
  process.env.ENVTYPE === "LOCAL"
    ? "http://localhost:3000/api"
    : `${process.env.DEV_BACKEND_URL}/api`;

export const urls = {
  sentOtp: "/otp/admin/sendotp",
  validateOtp: "/otp/validateotp",
};
