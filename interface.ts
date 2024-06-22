import mongoose from "mongoose";

export interface DentistItem {
  objectId : mongoose.Schema.Types.ObjectId
  _id: string;
  name: string;
  yearsOfExperience: string;
  areaOfExpertise: string;
  picture: string;
}

export interface DentistJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: DentistItem[];
}

export interface AppointmentItem {
  _id: string;
  appDate: Date;
  user: string;
  userName: string;
  dentist: DentistItem;
  finished: boolean;
  createAt: string;
  report: ReportItem[];
}

export interface ReportJson {
  success: boolean;
  count: number;
  data: ReportItem[];
}

export interface ReportItem {
  objectId : mongoose.Schema.Types.ObjectId
  _id: string;
  patientId:PatientItem;
  dentistId:DentistItem;
  appointmentId:AppointmentItem;
  treatment:string;
  prescribed_medication:string;
  recommendations:string;
  date: Date;
}

export interface PatientItem{
  objectId : mongoose.Schema.Types.ObjectId
  _id: string;
  name: string;
  email: string;
  role: string;
  userType: string;
  tel: string;
}



export interface AppointmentJson {
  success: boolean;
  count: number;
  data: AppointmentItem[];
}

