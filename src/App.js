import React from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useResolvedLocation,
  Outlet,
  useMatch,
  useRoutes,
  matchRoutes,
  useParams,
} from "react-router-dom";

function NavLink({
  className,
  activeClassName,
  inactiveClassName,
  to,
  exact,
  ...rest
}) {
  // First implementation
  // let location = useLocation();
  // let toLocation = useResolvedLocation(to);
  // let isActive = location.pathname === toLocation.pathname;

  // Second implementation
  // let location = useLocation();
  // let matchedRoutes = matchRoutes(routes, location);
  // let isActive = matchedRoutes.some((match) => match.pathname === to);

  // Third implementation
  let isActive;
  let location = useLocation();
  let toLocation = useResolvedLocation(to);

  if (exact) {
    isActive = location.pathname === toLocation.pathname;
  } else {
    let matchedRoutes = matchRoutes(routes, location);
    isActive = matchedRoutes.some(
      (match) => match.pathname === toLocation.pathname
    );
  }

  let allCasses =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  return <Link className={allCasses} to={to} {...rest} />;
}

function HeaderNavLink({ children, ...rest }) {
  return (
    <NavLink
      activeClassName="border-indigo-500 text-gray-900"
      inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
      {...rest}
    >
      {children}
    </NavLink>
  );
}

const routes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <DashboardPage title="Revenue" />,
      },
      {
        path: "/new-users",
        element: <NewUsersPage />,
        children: [{ path: "/:userId", element: <NewUserDetail /> }],
      },
      {
        path: "/sales",
        element: <DashboardPage title="Sales" />,
      },
    ],
  },
  { path: "/team", element: <Team /> },
  { path: "/projects", element: <Projects /> },
  { path: "/calendar", element: <Calendar /> },
];

function NewUsersPage() {
  return (
    <div className="grid-cols-2 grid gap-2">
      <div>
        <p className="mb-4">New users:</p>
        {[...Array(20).keys()].map((index) => (
          <div key={index}>
            <NavLink
              activeClassName="text-gray-900"
              inactiveClassName="text-gray-300 hover:text-gray-500"
              to={`${index}`}
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

function NewUserDetail() {
  let params = useParams();

  console.log({ params });

  return <p className="text-lg font-semibold">User {params.userId} Details</p>;
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
                <HeaderNavLink to="/">Dashboard</HeaderNavLink>
                <HeaderNavLink to="/team">Team</HeaderNavLink>
                <HeaderNavLink to="/projects">Projects</HeaderNavLink>
                <HeaderNavLink to="/calendar">Calendar</HeaderNavLink>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500    transition duration-150 ease-in-out"
                aria-label="Notifications"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    className="flex text-sm border-2 border-transparent rounded-full   transition duration-150 ease-in-out"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        {element}
        {/* <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<DashboardPage title="Revenue" />} />
            <Route
              path="/new-users"
              element={<DashboardPage title="New users" />}
            />
            <Route path="/sales" element={<DashboardPage title="Sales" />} />
          </Route>
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes> */}
      </div>
    </div>
  );
}

function TabLink(props) {
  return (
    <NavLink
      activeClassName="text-gray-700 bg-gray-100"
      inactiveClassName="text-gray-500 hover:text-gray-700"
      className="px-2 py-1 font-medium text-xs leading-5 rounded-md"
      {...props}
    />
  );
}

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Dashboard
        </h1>
        <nav className="flex space-x-4 ml-10">
          <TabLink to="/" exact>
            Revenue
          </TabLink>
          <TabLink to="/new-users">New users</TabLink>
          <TabLink to="/sales">Sales</TabLink>
        </nav>
      </div>
      <div className="py-10">
        <Outlet />
      </div>
    </div>
  );
}

function DashboardPage({ title }) {
  return <p>{title}</p>;
}

function Team() {
  return <Page title="Team" />;
}

function Projects() {
  return <Page title="Projects" />;
}

function Calendar() {
  return <Page title="Calendar" />;
}

function Page({ title, children }) {
  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
