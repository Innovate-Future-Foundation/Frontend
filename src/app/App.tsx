import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routerConfig from "../routes/index";

const App: React.FC = () => {
  const router = createBrowserRouter(routerConfig);
  return <RouterProvider router={router} />;
};

export default App;
