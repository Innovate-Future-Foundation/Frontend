import { Link, Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">
            <p>Home</p>
          </Link>
          |
          <Link to="/about">
            <p>About</p>
          </Link>
        </nav>
      </header>
      <main>
        {/* Renders the component matching the current route */}
        <Outlet />
      </main>
    </div>
  );
};

export default App;
