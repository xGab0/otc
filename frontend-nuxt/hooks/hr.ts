export interface HrAttendance {
  id: number,
  employee_id: [number, string],
  department_id: [number, string],
  check_in: string,
  check_in_latitude: number,
  check_in_longitude: number,
  check_out: string,
  check_out_latitude: number,
  check_out_longitude: number,
  worked_hours: number
}
