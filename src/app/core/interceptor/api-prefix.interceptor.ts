import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  // 只處理 api 和 sso 請求
  if (!req.url.startsWith("api/") && !req.url.startsWith("sso/")) {
    return next(req);
  }

  // 開發環境（BASE_URL 為空）不處理，讓 proxy 處理
  if (!environment.BASE_URL) {
    return next(req);
  }

  // 其他環境加上完整路徑前綴
  const fullUrl = `${environment.BASE_URL}${environment.CONTENT_PATH}/${req.url}`;
  // console.log("Original URL:", req.url);
  // console.log("Rewritten URL:", fullUrl);

  return next(req.clone({ url: fullUrl }));
};
