import type { AppointmentData } from '../../pages/AppointmentPage';

/**
 * Helpers de données pour les tests.
 * - appointmentData.valid() : jeu de données “cas nominal” cohérent
 * - isoDatePlus() / isoToDdMmYyyy() : utilitaires de dates pour générer des cas (J-1, J+1, etc.)
 */

export const appointmentData = {
    // Données valides par défaut (base stable pour la plupart des scénarios).
    valid(): AppointmentData {
        return {
            facility: 'Tokyo CURA Healthcare Center',
            readmission: true,
            program: 'Medicare',
            comment: `Test e2e ${Date.now()}`,
        };
    },
};

// Retourne la date du jour + N au format CURA (dd/mm/yyyy) → pratique pour J-1 / J / J+1 / J+365.
export function curaDatePlus(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}

