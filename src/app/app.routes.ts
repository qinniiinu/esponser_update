import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./core/layout/main-layout/main-layout.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "home", component: MainLayoutComponent },
  { path: "**", component: NotFoundComponent },
];
