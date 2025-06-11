import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  return (
    <div className=" w-screen  flex flex-col items-center justify-center  ">
      {isLoggedIn ? (
        <LoginForm loginState={setIsLoggedIn} />
      ) : (
        <RegisterForm registerState={setIsLoggedIn} />
      )}
    </div>
  );
};

export default AuthPage;
