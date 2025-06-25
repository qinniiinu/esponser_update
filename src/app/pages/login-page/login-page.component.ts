import { Component, inject } from "@angular/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ResponsiveService } from "../../core/service/responsive.service";

@Component({
  selector: "allia-login-page",
  imports: [MatSlideToggleModule],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
  readonly responsive = inject(ResponsiveService);
}
