import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

export type IAcctDTO = {};
type ITokenData = {
  id: string;
  isTemporary: boolean;
};

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  private _router = inject(Router);

  private _$$tokenData = signal<ITokenData | null>(null);
  private _$$userData = signal<IAcctDTO | null>(null);

  $getTokenData = computed(() => this._$$tokenData());
  $getUserData = computed(() => this._$$userData());
  $isLoggedIn = computed(() => {
    const tokenData = this._$$tokenData();
    return !!tokenData && !tokenData.isTemporary;
  });

  constructor() {
    const storedTokenData = sessionStorage.getItem("tokenData");
    if (storedTokenData) {
      this._$$tokenData.set(JSON.parse(storedTokenData));
    }

    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      this._$$userData.set(JSON.parse(storedUserData));
    }
  }

  setTokenData(id: string, isTemporary: boolean = false): void {
    this._$$tokenData.set({ id, isTemporary });
    sessionStorage.setItem("tokenData", JSON.stringify(this._$$tokenData()));
  }

  setUserData(data: IAcctDTO): void {
    this._$$userData.set({ ...data });
    sessionStorage.setItem("userData", JSON.stringify(this._$$userData()));
  }

  clearAll(): void {
    this._$$tokenData.set(null);
    this._$$userData.set(null);

    sessionStorage.removeItem("tokenData");
    sessionStorage.removeItem("userData");
  }

  logout(): void {
    this.clearAll();
    this._router.navigateByUrl("/auth/login");
  }
}
