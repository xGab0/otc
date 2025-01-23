import type { OdooModelData } from "./odoo/data"
import { OdooModule } from "./odoo/module"
import type { OdooRecord } from "./odoo/wrapper"

export interface HrAttendance extends OdooRecord {
  id: number,
  employee_id: [number, string],
  department_id: [number, string],
  check_in: string,
  check_in_latitude: number | boolean,
  check_in_longitude: number | boolean,
  check_out: string | boolean,
  check_out_latitude: number | boolean,
  check_out_longitude: number | boolean,
  worked_hours: number
}
