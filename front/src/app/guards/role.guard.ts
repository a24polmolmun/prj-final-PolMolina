import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const usuari = authService.usuarioInfo;

    // Si no està autenticat, el portem al login
    if (!authService.isAuthenticated() || !usuari) {
        router.navigate(['/']);
        return false;
    }

    // Obtenim els rols permesos per aquesta ruta des de la configuració de la ruta
    const expectedRoles = route.data['expectedRoles'] as string[];
    const userRole = usuari.rol?.toLowerCase();

    if (expectedRoles && expectedRoles.length > 0) {
        const hasRole = expectedRoles.some(role => role.toLowerCase() === userRole);

        if (hasRole) {
            return true;
        } else {
            // Si no té el rol, el portem al seu panell per defecte (o al login si tot falla)
            console.warn(`Acces denegat per al rol ${userRole}. Rols esperats: ${expectedRoles.join(', ')}`);

            // Re-utilitzem la lògica de redirecció del servei per tornar-lo al seu lloc
            (authService as any).redirectByRole(usuari.rol);
            return false;
        }
    }

    return true;
};
