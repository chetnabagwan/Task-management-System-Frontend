import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionStorageService } from '../services/session-storage-service.service';
import { JWTService } from '../services/jwt-token-service.service';

export const onlyManagerGuard: CanActivateFn = (route, state) => {
  // Injecting Services in the function
  const storageService = inject(SessionStorageService);
  const jwtService = inject(JWTService);
  const router = inject(Router);

  const TOKEN = storageService.getFromSessionStorage('token');
  const ROLE = jwtService.getRoleFromToken(TOKEN);

  if (ROLE === 'manager') {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};