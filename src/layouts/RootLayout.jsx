import Footer from "@/pages/Shared/Footer/Footer";
import { Outlet } from "react-router";
import Header from "../pages/Shared/Header/Header";

function RootLayout() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default RootLayout;
