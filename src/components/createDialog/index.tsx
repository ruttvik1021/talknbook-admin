import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        <Button variant="outline" onClick={() => setCreateModal(true)}>
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
