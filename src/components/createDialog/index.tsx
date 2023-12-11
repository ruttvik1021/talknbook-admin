import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogCancel } from "../ui/alert-dialog";

type ICreateDialog = {
  buttonText: string;
  title: string;
  description: string;
  form: React.ReactNode;
  open: boolean;
  setCreateModal: (boolean: boolean) => void;
};
const CreateDialog = ({
  buttonText,
  title,
  description,
  form,
  open,
  setCreateModal,
}: ICreateDialog) => {
  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button variant="success" onClick={() => setCreateModal(true)}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
