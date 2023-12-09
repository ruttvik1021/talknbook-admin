"use client";

import UserDetailsComponent from "@/components/userDetails";
import { useParams } from "next/navigation";

const UserDetails = () => {
  const { userId } = useParams();
  return <UserDetailsComponent userId={userId as string} />;
};

export default UserDetails;
