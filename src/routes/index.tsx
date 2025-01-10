import DashboardPage from "@/pages/Dashboard";
import HomePage from "@/pages/Home";
import OrganisationPage from "@/pages/Organisation";
import AboutUs from "@/pages/AboutUs";
import EventPage from "@/pages/EventPage";
// import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const router = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "about-us",
    element: <AboutUs />
  },
  {
    path: "eventpage",
    element: <EventPage />
  },
  {
    path: "dashboard",
    element: (
      // <ProtectedRoute>
      <DashboardPage />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <OrganisationPage />
      }
    ]
  }
];

export default router;
