export class FilterPatientsForClinic {
  clinicId: string;
  fieldTokenPairs: Array<[string, string]>;
  filterActive: boolean;
  page: number;
  pageSize: number;
  sort: {
    [key: string]: 1 | -1;
  };
}
