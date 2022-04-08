export class UpdatePatientDto {
  id: string;
  address: string;
  clinic: string;
  dateOfBirth: Date;
  email?: string;
  firstName: string;
  gender: string;
  lastName: string;
  notes: object;
  diagnostic: object;
  treatment: object;
  diagnostic_practician: object;
  treatmentc_practician: object;
  scores?: {
    OBC?: number;
    PHQ4?: number;
    PHQ9?: number;
    MAN8?: number;
    MORPHO?: number;
    GAD7?: number;
    GCPS?: number
  }
}
