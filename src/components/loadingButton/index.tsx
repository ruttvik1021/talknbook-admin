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
  const { isloading, text } = props;
  return (
    <Button
      disabled={props.isloading}
      onClick={props.onClick}
      className={`flex justify-center items-center ${props.className}`}
      {...props}
    >
      {isloading ? <LoadingIcon className="w-6 h-6 animate-spin" /> : text}
    </Button>
  );
};

export default LoadingButton;
