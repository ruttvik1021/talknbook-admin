"use client";
import {
  addSpecializationApi,
  deleteSpecializationApi,
  getAllSpecializations,
  updateSpecializationsApi,
} from "@/utils/apis";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ConfirmationDialog from "../confirmationDialog";
import CreateDialog from "../createDialog";
import DeleteIcon from "../icons/deleteIcon";
import LoadingButton from "../loadingButton";
import PageTitle from "../pagetitle";
import StatusBadge from "../statusBadge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AxiosError } from "axios";
import { toast } from "../ui/use-toast";

const SpecializationComponent = () => {
  const query = useQueryClient();
  const [createModal, setCreateModal] = useState(false);
  const [updatingRowId, setUpdatingRowId] = useState(null);
  const [initialPayload, setInitialPayload] = useState({
    limit: 10,
    offset: 0,
  });

  const {
    data: specializations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["specializations", initialPayload],
    queryFn: () => getAllSpecializations(initialPayload),
    placeholderData: keepPreviousData,
  });

  const { mutate: updateSpecialization } = useMutation({
    mutationFn: ({ specializationId, item }: any) => {
      return updateSpecializationsApi({ specializationId, item });
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["specializations"] });
      setUpdatingRowId(null);
    },
    onError(error: AxiosError) {
      const { message } = error.response?.data as any;
      toast({
        variant: "destructive",
        title: message,
      });
    },
  });

  const { mutate: deleteSpecialization, isPending: isDeletingSpecialization } =
    useMutation({
      mutationFn: (id: string) => {
        return deleteSpecializationApi(id);
      },
      onSuccess: () => {
        query.invalidateQueries({ queryKey: ["specializations"] });
      },
      onError(error: AxiosError) {
        const { message } = error.response?.data as any;
        toast({
          variant: "destructive",
          title: message,
        });
      },
    });

  const { mutate: addSpecialization, isPending: isAddingSpecialization } =
    useMutation({
      mutationFn: (values: any) => {
        return addSpecializationApi(values);
      },
      onSuccess: () => {
        query.invalidateQueries({ queryKey: ["specializations"] });
        setCreateModal(false);
        formik.resetForm();
      },
      onError(error: AxiosError) {
        const { message } = error.response?.data as any;
        toast({
          variant: "destructive",
          title: message,
        });
      },
    });

  const validationSchema = Yup.object().shape({
    specialization: Yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      specialization: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addSpecialization(values);
    },
  });

  const addSpecializationForm = () => {
    return (
      <FormikProvider value={formik}>
        <Form>
          <Field name="specialization">
            {({ field, meta }: FieldProps) => (
              <div>
                <Input type="text" placeholder="Specialization" {...field} />
                {meta.touched && meta.error && (
                  <Label className="text-red-500">{meta.error}</Label>
                )}
              </div>
            )}
          </Field>
          <div className="flex justify-end mt-5 gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isAddingSpecialization}
              onClick={() => {
                formik.resetForm();
                setCreateModal(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              className="btn"
              variant="default"
              onClick={() => formik.handleSubmit}
              text={"Submit"}
              isloading={isAddingSpecialization}
            />
          </div>
        </Form>
      </FormikProvider>
    );
  };

  const pageHeader = () => {
    return (
      <>
        <div className="flex justify-between items-end mb-5">
          <PageTitle
            title={`Specializations (${
              isLoading ? 0 : specializations?.data.total
            })`}
            onClick={() =>
              query.invalidateQueries({ queryKey: ["specializations"] })
            }
          />
          <CreateDialog
            buttonText={"Add New"}
            title={"Add Specialization"}
            description={"Enter name of specialization"}
            form={addSpecializationForm()}
            open={createModal}
            setCreateModal={setCreateModal}
          />
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <>
        {pageHeader()}
        <p>Loading...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        {pageHeader()}
        <p>Something went wrong.</p>
      </>
    );
  }

  if (
    !specializations?.data.specializations ||
    specializations.data.specializations.length === 0
  ) {
    return (
      <>
        {pageHeader()}
        <p>No data found.</p>
      </>
    );
  }

  return (
    <>
      {pageHeader()}
      <Table className="w-full border">
        <TableHeader className="bg-slate-300">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[20%]">Status</TableHead>
            <TableHead className="w-[10%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specializations.data.specializations.map((spec: any) => (
            <TableRow key={spec.id} className="border-slate-300 border-b-2">
              <TableCell>{spec.specialization}</TableCell>
              <TableCell>
                <StatusBadge status={spec.isActive} type="Active/Inactive" />
              </TableCell>
              <TableCell className="flex items-center gap-5">
                <Switch
                  disabled={updatingRowId === spec.id}
                  checked={spec.isActive}
                  onCheckedChange={(e) => {
                    setUpdatingRowId(spec.id);
                    updateSpecialization({
                      specializationId: spec.id,
                      item: { ...spec, isActive: e },
                    });
                  }}
                />
                <p>
                  <ConfirmationDialog
                    render={<DeleteIcon className="cursor-pointer" />}
                    title="Are you sure you want to delete specialization ?"
                    description={`${spec.specialization} will be deleted.`}
                    cancelRender={"Cancel"}
                    confirmRender={
                      <LoadingButton
                        variant="destructive"
                        disabled={isDeletingSpecialization}
                        onClick={() => deleteSpecialization(spec.id)}
                        text={"Confirm"}
                        isloading={isDeletingSpecialization}
                      />
                    }
                  />
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SpecializationComponent;
