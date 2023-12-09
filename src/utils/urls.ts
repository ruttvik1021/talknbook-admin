// export const unAuthBaseUrl = "http://localhost:3000";
export const unAuthBaseUrl = "https://talk-n-book.onrender.com";

// export const authBaseUrl = "http://localhost:3000/api";
export const authBaseUrl = "https://talk-n-book.onrender.com/api";

export const urls = {
  sentOtp: "/otp/admin/sendotp",
  validateOtp: "/otp/validateotp",
  getAllUsers: "/allUsers",
};

export const routes = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: "",
  },
];
