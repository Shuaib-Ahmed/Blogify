import React, { Suspense } from "react";
import "./index.css";

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
  BlogDetailPage,
} from "./pages";

import { Loading } from "./components";

import { blogCategories } from "./util/blogactions";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LayoutPage />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="sign-up"
          element={
            <Suspense fallback={<Loading />}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route
          path="log-in"
          element={
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPasswordPage />
            </Suspense>
          }
        />
        {blogCategories.map((category) => {
          return (
            <Route
              path="blogs/:category"
              element={
                <Suspense fallback={<Loading />}>
                  <BlogCategoryPage />
                </Suspense>
              }
              key={category}
            />
          );
        })}
        <Route
          path="blog/:blog_id"
          element={
            <Suspense fallback={<Loading />}>
              <BlogDetailPage />
            </Suspense>
          }
        />
        <Route
          path="write-new-blog"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectPage>
                <WriteBlogPage />
              </ProtectPage>
            </Suspense>
          }
        />
        <Route
          path="account"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectPage>
                <AccountPage />
              </ProtectPage>
            </Suspense>
          }
        />
        <Route
          path="update-blog/:blog_id"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectPage>
                <UpdateBlogPage />
              </ProtectPage>
            </Suspense>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
