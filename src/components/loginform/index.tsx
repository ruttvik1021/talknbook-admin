// import TextField, { fieldTypeEnums } from "../textField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const LoginComponent = () => {
  return (
    <>
      <Card className="card w-full md:w-2/3 lg:w-1/3">
        <CardHeader>
          <CardTitle>Talk N Book</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Hello Admin, just a step to verify you.
          </CardDescription>
          {/* <TextField
            type={fieldTypeEnums.TEXT}
            label={"Email"}
            name={"email"}
            placeholder={"Email"}
          /> */}
        </CardContent>
      </Card>
    </>
  );
};

export default LoginComponent;
