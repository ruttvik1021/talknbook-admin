"use client";

import { getUsers } from "@/utils/apis";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PageTitle from "../pagetitle";

const UsersComponent = () => {
  const [initialPayload, setInitialPayload] = useState({
    limit: 10,
    offset: 0,
  });

  const {
    data: users,
    isFetching: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(initialPayload),
    enabled: true,
    refetchOnMount: false,
  });

  return (
    <>
      <PageTitle title={"Users Page"} onClick={() => refetchUsers()} />
      {isUsersLoading && <p>Loading...</p>}
      {users && !isUsersLoading && (
        <>
          {users.data.map((user: any) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </>
      )}
    </>
  );
};

export default UsersComponent;
