import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface IPageTitle {
  title: string;
  onClick?: () => void;
  className?: string;
}

const PageTitle = (props: IPageTitle) => {
  const { title, onClick, className } = props;
  return (
    <>
      <div>
        <Label
          onClick={onClick}
          className={`text-3xl text-red-700 border-red-700 border-b-2 mb-5 ${className} ${
            onClick ? "cursor-pointer" : ""
          }`}
        >
          {title}
        </Label>
      </div>
    </>
  );
};

export default PageTitle;
