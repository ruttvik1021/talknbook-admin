import { Label } from "../ui/label";

interface IPageTitle {
  title: string;
  onClick?: () => void;
}

const PageTitle = (props: IPageTitle) => {
  const { title, onClick } = props;
  return (
    <>
      <Label onClick={onClick} className={onClick ? "cursor-pointer" : ""}>
        {title}
      </Label>
    </>
  );
};

export default PageTitle;
