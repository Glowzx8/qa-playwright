import type { AppointmentData } from '../../pages/AppointmentPage';


export const appointmentData = {
    valid(): AppointmentData {
        return {
            facility: 'Tokyo CURA Healthcare Center',
            readmission: true,
            program: 'Medicare',
            comment: `E2E appointment ${Date.now()}`,
        };
    },
};
