import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import HomeCarousel from "../../components/HomeCarousel";
const HomeLayout = () => {
  return (
    <>
      <Header />
      <HomeCarousel/>
      <Outlet />
    </>
  );
};
export default HomeLayout;
