"use client";

import { getUserDetails } from "@/utils/apis";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import PageTitle from "../pagetitle";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const UserDetailsComponent = ({ userId }: { userId: string }) => {
  const {
    data: userDetails,
    isFetching,
    refetch: refetchUser,
  } = useQuery({
    queryKey: [`userDetails-${userId}`],
    queryFn: () => getUserDetails(userId),
    enabled: true,
    placeholderData: keepPreviousData,
    staleTime: 10000,
  });
  const router = useRouter();

  const subLabels = (string: string) => {
    return <Label className="text-lg font-bold">{string}</Label>;
  };

  const headLabels = (string: string) => {
    return <Label className="text-xl font-bold my-5">{string}</Label>;
  };

  const locations = ["Pune", "Mumbai", "Delhi"];

  return (
    <>
      <PageTitle title={"Back"} onClick={router.back} />
      {isFetching && <p>Fetching....</p>}
      {userDetails && (
        <>
          <div className="flex min-w-0 gap-x-4 items-center">
            <Avatar className="w-32 h-32 flex-none rounded-full bg-gray-50">
              <AvatarImage
                src={userDetails.data.profilePhoto}
                alt={userDetails.data.name}
              />
            </Avatar>
            <div className="min-w-0 flex-auto">
              <p className="text-3xl font-bold leading-6 text-black">
                {userDetails.data.name}
              </p>
              <p className="mt-1 truncate text-xl leading-5 text-gray-500">
                {userDetails.data.email}
              </p>
            </div>
          </div>
          <div className="flex gap-10 mt-5">
            <div className="flex items-center gap-3">
              <Checkbox checked={userDetails.data.isActive} />
              {subLabels("Is Active")}
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked={userDetails.data.isServiceProvider} />
              {subLabels("Is Service Provider")}
            </div>
          </div>
          <div className="my-5">{headLabels("General Information :-")}</div>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
            <div>
              {subLabels("Mobile Number")}
              <p>{userDetails.data.mobileNumber}</p>
            </div>
            <div>
              {subLabels("Date of birth:")}
              <p>{userDetails.data.dateOfBirth}</p>
            </div>
            <div>
              {subLabels("Gender")}
              <p>{userDetails.data.gender}</p>
            </div>
          </div>
          <div className="mt-5 grid">
            <div>
              {subLabels("Onsite Service")}
              <p>
                {userDetails.data.onSiteService
                  ? "Available:- "
                  : "Unavailable"}
                {userDetails.data.onSiteService &&
                  userDetails.data.locations.map(
                    (location: any, index: number) => (
                      <span className="ml-2" key={`${location}-${index}`}>
                        {location}
                        {index < locations.length - 1 ? "," : "."}
                      </span>
                    )
                  )}
              </p>
            </div>
          </div>
          <div className="mt-5 grid">
            {userDetails.data.specializations.map(
              (spec: any, specIndex: number) => (
                <div key={`${spec.specializationId}-${specIndex}`}>
                  {subLabels("Specialization")}
                  <p>{spec.specializationId}</p>
                  {spec.certificates.map((certificate: any, index: number) => (
                    <div className="flex mt-5 items-center" key={certificate}>
                      <img
                        src={`${certificate}`}
                        width={100}
                        height={100}
                        alt={`Certificate ${index + 1}`}
                        onClick={() => window.open(certificate)}
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserDetailsComponent;
