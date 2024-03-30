export interface AttendanceParams {
  userId: string;
  attendanceDate: string;
  attendance: string;
  contextId: string;
}

export interface CohortCardProps {
  showBackground: boolean;
  isRemote: boolean;
  cohortName: string;
}

export interface MarkAttendanceProps {
  isOpen: boolean;
  isSelfAttendance?: boolean;
  date: string;
  name?: string;
  currentStatus: string;
  handleClose: () => void;
  handleSubmit: (attendanceDate: string, attendance: string) => void;
}

export interface AttendanceStatusListViewProps {
  currentStatus: string;
  studentName: string;
  isEdit?: boolean;
  isBulkAction?: boolean;
  handleBulkAction?: (status: string) => void;
}

export interface UserAttendanceObj {
  userId: string;
  attendance: string;
}

export interface BulkAttendanceParams {
  attendanceDate: string;
  contextId: string;
  userAttendance: UserAttendanceObj[];
}

export interface cohortListParam {
  limit: 'string';
  page: number;
  filters: object;
}

export interface cohortDetailsList {
  contextId: string;
  report: boolean;
  limit: number;
  offset: number;
  filters: object;
}
export interface AttendanceByDateParams {
  fromDate: string;
  toDate: string;
  page:number
  filters: {
    userId: string;
    contextId:string
  };
}

export interface UserData {
  id: number;
  name: string;
  role: string;
  district: string;
  state: string;
  email: string;
  dob?: string;
}

export interface Student {
  name: string;
  attendance_percentage: number;
  label1: string;
  label2: string;
}
