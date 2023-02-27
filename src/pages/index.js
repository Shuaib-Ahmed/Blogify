import { lazy } from "react";

import LayoutPage from "./LayoutPage";
import ProtectPage from "./ProtectPage";

const HomePage = lazy(() => import("./HomePage"));
const LoginPage = lazy(() => import("./LoginPage"));
const SignUpPage = lazy(() => import("./SignUpPage"));
const ForgotPasswordPage = lazy(() => import("./ForgotPasswordPage"));
const WriteBlogPage = lazy(() => import("./WriteBlogPage"));
const AccountPage = lazy(() => import("./AccountPage"));
const BlogCategoryPage = lazy(() => import("./BlogCategoryPage"));
const BlogDetailPage = lazy(() => import("./BlogDetailPage"));
const UpdateBlogPage = lazy(() => import("./UpdateBlogPage"));

export {
  LayoutPage,
  ProtectPage,
  HomePage,
  SignUpPage,
  LoginPage,
  ForgotPasswordPage,
  BlogCategoryPage,
  WriteBlogPage,
  UpdateBlogPage,
  AccountPage,
  BlogDetailPage,
};
