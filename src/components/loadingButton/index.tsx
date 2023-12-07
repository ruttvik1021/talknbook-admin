import React from "react";
import { Button, ButtonProps } from "../ui/button";
import LoadingIcon from "../icons/loadingIcon";

interface IButton {
  text: string;
  className?: string;
  onClick?: () => void;
  isloading: boolean;
}

type IButtonProps = ButtonProps & IButton;

const LoadingButton = (props: IButtonProps) => {
  const { className, isloading, onClick, text } = props;
  return (
    <Button
      {...props}
      disabled={isloading}
      onClick={onClick}
      className={`flex justify-center items-center ${className}`}
    >
      {isloading ? (
        <LoadingIcon className="w-full h-full animate-spin" />
      ) : (
        text
      )}
    </Button>
  );
};

export default LoadingButton;
