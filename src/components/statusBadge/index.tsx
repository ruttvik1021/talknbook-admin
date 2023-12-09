import React from "react";
import { Badge } from "../ui/badge";

type Type = "Active/Inactive" | "Boolean";

const StatusBadge = ({ status, type }: { status: boolean; type: Type }) => {
  return (
    <Badge
      className={`text-black  ${
        status
          ? "border-green-600 bg-green-300 hover:bg-green-400"
          : "border-red-600 bg-red-300 hover:bg-red-400"
      }`}
    >
      {type === "Active/Inactive" && `${status ? "Active" : "Inactive"}`}
      {type === "Boolean" && `${status}`.toUpperCase()}
    </Badge>
  );
};

export default StatusBadge;
