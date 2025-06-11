import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex justify-center items-start px-4 pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
