export interface IBookingList {
  booking_name: string;
  code: string;
  created_at: string;
  end_time: string;
  hours: number;
  id: string;
  id_arena: string;
  id_partner: string;
  id_user: string;
  paid_at: string | null;
  phone: string;
  start_time: string;
  status: "SUBMITTED";
  time: string;
  total: number;
  venue: string;
}
