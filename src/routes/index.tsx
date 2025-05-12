import AuthLayout from "@/layouts/auth";
import DashboardLayout from "@/layouts/dashboard";
import DefaultLayout from "@/layouts/default";
import IndexPage from "@/pages";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import { Provider } from "@/provider";
import ProtectedRoute from "@/components/protected-routes";
import NotFoundPage from "@/components/not-found";
import ErrorPage from "@/components/error";
import CloneListPage from "@/pages/clones";
import CreateClonePage from "@/pages/clones/create";
import CloneDetailPage from "@/pages/clones/[id]";
import ChatHubPage from "@/pages/chat";
import CloneChatPage from "@/pages/chat/[cloneId]";

export const routes = [
  {
    path: "/",
    element: (
      <Provider>
        <DefaultLayout>
          <IndexPage />
        </DefaultLayout>
      </Provider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: (
      <Provider>
        <AuthLayout />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "u",
    element: (
      <Provider>
        <ProtectedRoute requireAuth={true} />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":userId",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },

          { path: "settings", element: <div>Settings</div> },

          // Clone routes
          {
            path: "clones",
            children: [
              {
                path: "",
                element: <CloneListPage />,
              },
              {
                path: "create",
                element: <CreateClonePage />,
              },
              {
                path: ":cloneId",
                element: <CloneDetailPage />,
              },
            ],
          },

          // Chat routes
          {
            path: "chats",
            children: [
              {
                path: "",
                element: <ChatHubPage />,
              },
              {
                path: ":cloneId",
                element: <CloneChatPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Provider>
        <DefaultLayout>
          <NotFoundPage />
        </DefaultLayout>
      </Provider>
    ),
  },
];
