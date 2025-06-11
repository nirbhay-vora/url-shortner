import UserUrl from "../components/UserUrl.jsx";
import UrlForm from "../pages/UrlForm.jsx";

const DashBoard = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <UrlForm />
        <UserUrl />
      </div>
    </>
  );
};

export default DashBoard;
