"use client";
import {
  addSpecializationApi,
  deleteSpecializationApi,
  getAllSpecializations,
  updateSpecializationsApi,
} from "@/utils/apis";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ConfirmationDialog from "../confirmationDialog";
import CreateDialog from "../createDialog";
import DeleteIcon from "../icons/deleteIcon";
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

const SpecializationComponent = () => {
  const [createModal, setCreateModal] = useState(false);
  const [initialPayload, setInitialPayload] = useState({
    limit: 10,
    offset: 0,
  });

  const {
    data: specializations,
    isLoading,
    isError,
    refetch: refetchSpecializations,
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
      refetchSpecializations();
    },
  });

  const { mutate: deleteSpecialization } = useMutation({
    mutationFn: (id: string) => {
      return deleteSpecializationApi(id);
    },
    onSuccess: () => {
      refetchSpecializations();
    },
  });

  const { mutate: addSpecialization } = useMutation({
    mutationFn: (values: any) => {
      return addSpecializationApi(values);
    },
    onSuccess: () => {
      refetchSpecializations();
      setCreateModal(false);
      formik.resetForm();
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

  const addSpecializationForm = (onClose: any) => {
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
              className="outline"
              variant="destructive"
              onClick={() => {
                formik.resetForm();
                setCreateModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="btn"
              onClick={() => formik.handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      </FormikProvider>
    );
  };

  return (
    <>
      <PageTitle title={`Specializations (${specializations?.data.total})`} />

      <div className="flex justify-end mb-5">
        <CreateDialog
          buttonText={"Add New"}
          title={"Add Specialization"}
          description={"Enter name of specialization"}
          form={addSpecializationForm(formik.handleSubmit)}
          open={createModal}
          setCreateModal={setCreateModal}
        />
      </div>
      {isLoading && <p>Fetching...</p>}
      {isError && <p>Error while fetching specializations</p>}
      {!specializations?.data.specializations.length ? (
        <p>No Data</p>
      ) : (
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
                    checked={spec.isActive}
                    onCheckedChange={(e) =>
                      updateSpecialization({
                        specializationId: spec.id,
                        item: { ...spec, isActive: e },
                      })
                    }
                  />
                  <p>
                    <ConfirmationDialog
                      render={<DeleteIcon />}
                      title="Are you sure you want to delete specialization ?"
                      description={`${spec.specialization} will be deleted.`}
                      onConfirmClick={() => deleteSpecialization(spec.id)}
                      cancelRender={<p>Cancel</p>}
                      confirmRender={
                        <Button
                          variant="destructive"
                          onClick={() => deleteSpecialization(spec.id)}
                        >
                          Confirm
                        </Button>
                      }
                    />
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default SpecializationComponent;
