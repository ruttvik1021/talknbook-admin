import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface IPageTitle {
  title: string;
  onClick?: () => void;
}

const PageTitle = (props: IPageTitle) => {
  const { title, onClick } = props;
  return (
    <>
      <div>
        <Label
          onClick={onClick}
          className={`text-3xl text-pageTitle border-pageTitle border-b-2 ${
            onClick ? "cursor-pointer" : ""
          }`}
        >
          {title}
        </Label>
        <Separator className="mb-5" />
      </div>
    </>
  );
};

export default PageTitle;
