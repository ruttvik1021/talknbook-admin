import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type IDialog = {
  title: string;
  description: string;
  onConfirmClick: () => void;
  render: React.ReactNode;
  cancelRender: React.ReactNode;
  confirmRender: React.ReactNode;
};

const ConfirmationDialog = ({
  title,
  description,
  onConfirmClick,
  render,
  cancelRender,
  confirmRender,
}: IDialog) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{render}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelRender}</AlertDialogCancel>
          {confirmRender}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
