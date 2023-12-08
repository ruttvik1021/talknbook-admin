"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NavLink from "../navbars/navlink";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

enum Greetings {
  GOOD_MORNING = "Good morning",
  GOOD_AFTERNOON = "Good afternoon",
  GOOD_EVENING = "Good evening",
}

const Landing = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();

  let greeting;

  if (hours < 12) {
    greeting = Greetings.GOOD_MORNING;
  } else if (hours < 18) {
    greeting = Greetings.GOOD_AFTERNOON;
  } else {
    greeting = Greetings.GOOD_EVENING;
  }

  const router = useRouter();
  return (
    <>
      <div
        className={`flex justify-center items-center w-full h-full bg-loginBgThemes`}
      >
        <Card className="card w-full md:w-1/3 lg:w-1/3 pt-4 border-green-500">
          <CardContent className="text-center">
            <div>
              <span className={`font-extrabold mr-2 text-3xl`}>{greeting}</span>
              <span className="font-extrabold text-3xl">Admin</span>
            </div>
            <Button
              variant="link"
              onClick={() => router.push("/login")}
              className={`text-xl hover:text-continueButton`}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Landing;
