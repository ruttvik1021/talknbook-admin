"use client";
import {
  addLanguageApi,
  deleteLanguageApi,
  getAllLanguages,
  updateLanguageApi,
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

const LanguagesComponent = () => {
  const query = useQueryClient();
  const [createModal, setCreateModal] = useState(false);
  const [updatingRowId, setUpdatingRowId] = useState(null);
  const [initialPayload, setInitialPayload] = useState({
    limit: 10,
    offset: 0,
  });

  const {
    data: languagesList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["languages", initialPayload],
    queryFn: () => getAllLanguages(initialPayload),
    placeholderData: keepPreviousData,
  });

  const { mutate: updateLanguage } = useMutation({
    mutationFn: ({ langId, item }: any) => {
      return updateLanguageApi({ langId, item });
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["languages"] });
      setUpdatingRowId(null);
    },
  });

  const { mutate: deleteLanguage, isPending: isDeletingLanguage } = useMutation(
    {
      mutationFn: (id: string) => {
        return deleteLanguageApi(id);
      },
      onSuccess: () => {
        query.invalidateQueries({ queryKey: ["languages"] });
      },
    }
  );

  const { mutate: addLanguage, isPending: isAddingLanguage } = useMutation({
    mutationFn: (values: any) => {
      return addLanguageApi(values);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["languages"] });
      setCreateModal(false);
      formik.resetForm();
    },
  });

  const validationSchema = Yup.object().shape({
    language: Yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      language: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addLanguage(values);
    },
  });

  const addLanguageForm = () => {
    return (
      <FormikProvider value={formik}>
        <Form>
          <Field name="language">
            {({ field, meta }: FieldProps) => (
              <div>
                <Input type="text" placeholder="Language" {...field} />
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
              disabled={isAddingLanguage}
              onClick={() => {
                formik.resetForm();
                setCreateModal(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              className="btn"
              variant="default"
              onClick={() => formik.handleSubmit}
              text={"Submit"}
              isloading={isAddingLanguage}
            />
          </div>
        </Form>
      </FormikProvider>
    );
  };

  const pageHeader = () => {
    return (
      <>
        <PageTitle
          title={`Languages (${isLoading ? 0 : languagesList?.data.total})`}
          onClick={() => query.invalidateQueries({ queryKey: ["languages"] })}
        />

        <div className="flex justify-end mb-5">
          <CreateDialog
            buttonText={"Add New"}
            title={"Add Language"}
            description={"Enter name of language"}
            form={addLanguageForm()}
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
    !languagesList?.data.languages ||
    languagesList.data.languages.length === 0
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
          {languagesList.data.languages.map((lang: any) => (
            <TableRow key={lang.id} className="border-slate-300 border-b-2">
              <TableCell>{lang.language}</TableCell>
              <TableCell>
                <StatusBadge status={lang.isActive} type="Active/Inactive" />
              </TableCell>
              <TableCell className="flex items-center gap-5">
                <Switch
                  disabled={updatingRowId === lang.id}
                  checked={lang.isActive}
                  onCheckedChange={(e) => {
                    setUpdatingRowId(lang.id);
                    updateLanguage({
                      langId: lang.id,
                      item: { ...lang, isActive: e },
                    });
                  }}
                />
                <p>
                  <ConfirmationDialog
                    render={<DeleteIcon className="cursor-pointer" />}
                    title="Are you sure you want to delete language ?"
                    description={`${lang.language} will be deleted.`}
                    cancelRender={"Cancel"}
                    confirmRender={
                      <LoadingButton
                        variant="destructive"
                        disabled={isDeletingLanguage}
                        onClick={() => deleteLanguage(lang.id)}
                        text={"Confirm"}
                        isloading={isDeletingLanguage}
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

export default LanguagesComponent;
