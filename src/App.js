import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import {
  LayoutPage,
  SignUpPage,
  LoginPage,
  ForgotPasswordPage,
  HomePage,
  BlogCategoryPage,
  WriteBlogPage,
  UpdateBlogPage,
  AccountPage,
  ProtectPage,
} from "./pages";

import { blogCategories } from "./util/blogactions";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<HomePage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="log-in" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        {blogCategories.map((category) => {
          return (
            <Route
              path="blogs/:category"
              element={<BlogCategoryPage />}
              key={category}
            />
          );
        })}
        <Route
          path="write-new-blog"
          element={
            <ProtectPage>
              <WriteBlogPage />
            </ProtectPage>
          }
        />
        <Route
          path="account"
          element={
            <ProtectPage>
              <AccountPage />
            </ProtectPage>
          }
        />
        <Route
          path="update-blog/:blog_id"
          element={
            <ProtectPage>
              <UpdateBlogPage />
            </ProtectPage>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
