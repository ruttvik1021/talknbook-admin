// export const unAuthBaseUrl = "http://localhost:3000";
export const unAuthBaseUrl = "https://talk-n-book.onrender.com";

// export const authBaseUrl = "http://localhost:3000/api";
export const authBaseUrl = "https://talk-n-book.onrender.com/api";

export const urls = {
  sentOtp: "/otp/admin/sendotp",
  validateOtp: "/otp/validateotp",
  getAllUsers: "/allUsers",
  getAllSpecializations: "/master/specializations",
  getUserById: "/user",
  deactivateUserById: "/deactivate/user",
  updateSpecialization: "/master/specialization/",
  addSpecialization: "/master/add/specializations",
};

export const routes = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "",
  },
  {
    label: "Master",
    href: "/admin/master/languages",
    subRoutes: [
      { label: "Languages", href: "/admin/master/languages" },
      { label: "Specializations", href: "/admin/master/specializations" },
    ],
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: "",
  },
];
