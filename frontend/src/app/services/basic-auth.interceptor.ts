import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";

import { Observable } from "rxjs";

import { AuthenticationService } from "./authentication.service";
import { environment } from "../../enviroments/enviroment";

export function basicAuthInterceptor(req: HttpRequest<any>,
  next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthenticationService);
  const user = authService.user$.value;
  const isApiUrl = req.url.startsWith(environment.baseUrl);
  if (user && isApiUrl) {
    const basicAuth = window.btoa(user.username + ':' + user.password);
    req = req.clone({ setHeaders: { Authorization: `Basic ${basicAuth}` } });
  }
  return next(req);
}
