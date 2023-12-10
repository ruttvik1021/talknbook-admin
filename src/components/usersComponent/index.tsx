"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/utils/apis";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageTitle from "../pagetitle";
import StatusBadge from "../statusBadge";
import { Avatar, AvatarImage } from "../ui/avatar";

const UsersComponent = () => {
  const query = useQueryClient();
  const router = useRouter();
  const [initialPayload, setInitialPayload] = useState({
    limit: 10,
    offset: 0,
  });

  const userTableHeadersAndKeys = [
    "User",
    "Mobile",
    "Status",
    "Service Provider",
    "Actions",
  ];

  const {
    data: usersList,
    isFetching: isUsersLoading,
    isError: usersListError,
  } = useQuery({
    queryKey: ["users", initialPayload],
    queryFn: () => getUsers(initialPayload),
    enabled: true,
    staleTime: 20000,
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <PageTitle
        title={`Users Page (${usersList?.data.total || 0})`}
        onClick={() => query.invalidateQueries({ queryKey: ["users"] })}
      />
      {isUsersLoading && <p>Loading...</p>}
      {usersListError && <p>Error while fetching data.</p>}
      {usersList?.data.users.length && !isUsersLoading ? (
        <>
          <Table className="w-full border">
            <TableHeader className="bg-slate-300">
              <TableRow>
                {userTableHeadersAndKeys.map((header: any) => (
                  <TableHead key={header} className="text-black font-bold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersList.data.users.map((user: any) => (
                <TableRow key={user.id} className="border-slate-300 border-b-2">
                  <TableCell>
                    <div className="flex min-w-0 gap-x-4">
                      <Avatar className="h-12 w-12 flex-none rounded-full bg-gray-50">
                        <AvatarImage src={user.profilePhoto} alt={user.name} />
                      </Avatar>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {user.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={user.isActive}
                      type="Active/Inactive"
                    />
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={user.isServiceProvider}
                      type="Boolean"
                    />
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(`/admin/users/${user.id}`)}
                    className="cursor-pointer hover:text-green-500"
                  >
                    View
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : null}
      {!usersList?.data.users.length && !isUsersLoading && <p>No Data</p>}
    </>
  );
};

export default UsersComponent;
