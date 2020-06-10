import React from "react";
import {
  Link,
  useLocation,
  Outlet,
  useRoutes,
  matchRoutes,
  useResolvedLocation,
  useParams,
} from "react-router-dom";

function NavLink({
  to,
  exact,
  className,
  activeClassName,
  inactiveClassName,
  ...rest
}) {
  let location = useLocation();
  let resolvedLocation = useResolvedLocation(to);
  let routeMatches = matchRoutes(routes, location);

  let isActive;
  if (exact) {
    isActive = location.pathname === resolvedLocation.pathname;
  } else {
    isActive = routeMatches.some(
      (match) => match.pathname === resolvedLocation.pathname
    );
  }

  let allClassNames =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  return <Link className={allClassNames} to={to} {...rest} />;
}

const routes = [
  {
    path: "/new-dashboard",
    element: <Dashboard />,
    children: [
      { path: "/", element: <p>Overview</p> },
      {
        path: "/new-users",
        element: <NewUsers />,
        children: [{ path: "/:id", element: <UserDetail /> }],
      },
      { path: "/sales", element: <p>Sales</p> },
    ],
  },
  { path: "/team", element: <Page title="Team" /> },
  { path: "/projects", element: <Page title="Projects" /> },
  { path: "/calendar", element: <Page title="Calendar" /> },
];

function NewUsers() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <p className="mb-4">New users:</p>

        {[...Array(20).keys()].map((index) => (
          <div key={index}>
            <NavLink
              to={`${index}`}
              activeClassName="text-gray-900"
              inactiveClassName="text-gray-300 hover:text-gray-500"
            >
              User {index}
            </NavLink>
          </div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function UserDetail() {
  let params = useParams();

  return <p className="text-lg font-semibold">User {params.id} detail</p>;
}

export default function App() {
  let element = useRoutes(routes);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                  alt="Workflow logo"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg"
                  alt="Workflow logo"
                />
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex space-x-8">
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/new-dashboard"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/team"
                >
                  Team
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/projects"
                >
                  Projects
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/calendar"
                >
                  Calendar
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">{element}</div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
          <nav className="flex ml-8">
            <NavLink
              to=""
              exact={true}
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Overview
            </NavLink>
            <NavLink
              to="new-users"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              New users
            </NavLink>
            <NavLink
              to="sales"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Sales
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function Page({ title }) {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
