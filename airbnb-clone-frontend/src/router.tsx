import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import { Children } from "react";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import UploadRoom from "./routes/UploadRoom";
import UploadPhotos from "./routes/UploadPhotos";
import ModifyRoom from "./routes/ModifyRoom";
import MyBookings from "./routes/MyBookings";
import ManageBookings from "./routes/ManageBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "mybookings",
        element: <MyBookings />,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings />,
      },
      { path: "rooms/upload", element: <UploadRoom /> },
      { path: "rooms/:roomPk", element: <RoomDetail /> },
      { path: "rooms/:roomPk/photos", element: <UploadPhotos /> },
      {
        path: "rooms/:roomPk/modify",
        element: <ModifyRoom />,
      },
      {
        path: "social",
        children: [{ path: "github", element: <GithubConfirm /> }],
      },
      {
        path: "social",
        children: [{ path: "kakao", element: <KakaoConfirm /> }],
      },
    ],
  },
]);

export default router;
