import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthStoreService } from "../auth/auth-store.service";

/**
 * 不需要授權的 API 路徑清單
 * 包含登入、註冊、重設密碼等公開訪問的端點
 *
 * @constant
 * @readonly
 */
const noAuthRequiredPaths: ReadonlyArray<string> = [
  // 可以繼續添加其他不需要授權的路徑
];

/**
 * 身份驗證攔截器
 *
 * 為需要授權的 API 請求添加 JWT token。
 * 根據預定義的路徑清單判斷是否需要授權，
 * 如需授權則從 AuthStoreService 獲取 token 並加入請求標頭。
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStoreService);

  if (needAuthorize(req)) {
    const tokenId = authStore.$getTokenData()?.id;
    if (tokenId) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      return next(authReq);
    }
  }

  return next(req);
};

/**
 * 判斷請求是否需要授權
 *
 * 檢查請求路徑是否在不需要授權的路徑清單中。
 * 會先移除 URL 中的查詢參數再進行比對。
 *
 * @param {HttpRequest<unknown>} req - HTTP 請求物件
 * @returns {boolean} 是否需要授權
 *                    - true: 需要授權
 *                    - false: 不需要授權
 *
 * @private
 */
function needAuthorize(req: HttpRequest<unknown>): boolean {
  const path = req.url.split("?")[0]; // 移除查詢參數
  return !noAuthRequiredPaths.some(noAuthPath => path.endsWith(noAuthPath));
}
