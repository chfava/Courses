export interface IPatient {
    _id: string;
    address: string;
    clinic: string;
    dateCreated: Date;
    dateOfBirth: Date;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    medicalExams: IMedicalExam[];
    note: string;
}

export interface IPatientCreation {
    address: string;
    clinic: string;
    dateOfBirth: Date;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
}

export interface IPatientUpdate {
    id: string;
    address: string;
    dateOfBirth: Date;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    note: string;
    clinic: string;
}

export interface IMedicalExamCreation {
    patient: string;
    practician: string;
    formsResults?: IFormAnswersUpdate[];
}

export interface IMedicalExamUpdate {
    id: string;
    diagnosis?: string;
    formsResults: IFormAnswers[];
    patient?: string;
    practician?: string;
    treatment?: string;
}

export interface IMedicalExam {
    _id: string;
    diagnosis: string;
    treatment: string;
    formsResults: string[];
    dateCreated: Date;
    patient: string;
    practician: string;
    __v: number;
}

export interface IFormAnswers {
    _id?: string;
    formConfig: string;
    result: Object;
}

export interface IFormAnswersUpdate {
    id?: string;
    formConfig: string;
    result: Object;
}

export interface IAccessToken {
    user: any;
    admin: any;
    practician: any;
    secretary: any;
}

export interface IPractician {
    _id: string;
    firstName: string;
    lastName: string;
    dateDeleted?: Date;
    clinic: string;
    user: string;
    phone: string;
}

export interface ISecretary {
    _id: string;
    firstName: string;
    lastName: string;
    clinic: string;
    user: string;
}

export interface IAdmin {
    _id: string;
    firstName: string;
    lastName: string;
    clinic: string;
    user: string;
}

export interface IClinic {
    _id: string;
    address: string;
    email: string;
    name: string;
    phone: string;
}

export interface IClinicCreate {
    address: string;
    email: string;
    name: string;
    phone: string;
}

export interface IClinicUpdate {
    id: string;
    address: string;
    email: string;
    name: string;
    phone: string;
}

export interface IEmployee {
    _id?: string;
    firstName: string;
    lastName: string;
    clinic: string;
    user?: string;
    phone?: string;
}

export interface IUser {
    _id?: string;
    username: string;
    password: string;
    role: string;
}
