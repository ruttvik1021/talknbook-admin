import React from "react";
import { Button, ButtonProps } from "../ui/button";
import LoadingIcon from "../icons/loadingIcon";

interface IButton {
  text: string;
  className?: string;
  onClick: () => void;
  isLoading: boolean;
}

type IButtonProps = IButton & ButtonProps;

const LoadingButton = (props: IButtonProps) => {
  const { className, isLoading, onClick, text } = props;
  return (
    <Button
      {...props}
      disabled={isLoading}
      onClick={onClick}
      className={`flex justify-center items-center ${className}`}
    >
      {isLoading ? (
        <LoadingIcon className="w-full h-full animate-spin" />
      ) : (
        text
      )}
    </Button>
  );
};

export default LoadingButton;
