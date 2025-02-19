import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";

export function authenticationGuard(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  const user = authService.user$.value;
  if (user) {
    return true;
  }
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
}
