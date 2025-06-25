import { BreakpointObserver } from "@angular/cdk/layout";
import { computed, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ScreenSizeLG, ScreenSizeMD, ScreenSizeSM } from "../../shared/utils/breakpoints";

@Injectable({
  providedIn: "root",
})
export class ResponsiveService {
  private _breakpointObserver = inject(BreakpointObserver);

  private _$$isSmScreen = signal(false);
  private _$$isMdScreen = signal(false);
  private _$$isLgScreen = signal(false);

  $isSmScreen = this._$$isSmScreen.asReadonly();
  $isMdUpScreen = computed(() => this._$$isMdScreen() || this._$$isLgScreen());
  $isLgScreen = this._$$isLgScreen.asReadonly();

  constructor() {
    this._setupBreakpointObserver();
  }

  private _setupBreakpointObserver(): void {
    this._breakpointObserver
      .observe([ScreenSizeSM, ScreenSizeMD, ScreenSizeLG])
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this._$$isSmScreen.set(result.breakpoints[ScreenSizeSM]);
        this._$$isMdScreen.set(result.breakpoints[ScreenSizeMD]);
        this._$$isLgScreen.set(result.breakpoints[ScreenSizeLG]);
      });
  }
}
