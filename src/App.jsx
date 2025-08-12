import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetail from "./activities/ActivityDetail";
import Error404 from "./Error404.jsx";
import RoutinesPage from "./routines/RoutinesPage";
import RoutineDetail from "./routines/RoutineDetail";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="activities/:activityId" element={<ActivityDetail />} />
        <Route path="*" element={<Error404 />} />
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="routines/:routineID" element={<RoutineDetail />} />
      </Route>
    </Routes>
  );
}
