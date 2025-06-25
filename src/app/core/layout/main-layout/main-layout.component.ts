import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ResponsiveService } from "../../service/responsive.service";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: "allia-main-layout",
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: "./main-layout.component.html",
  styleUrl: "./main-layout.component.scss",
})
export class MainLayoutComponent {
  readonly responsiveService = inject(ResponsiveService);
}
