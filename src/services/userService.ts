import { axiosInstance } from "./axiosInstance";

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon_url: string;
  tender_count: number;
}

export interface PackageDetails {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  intro: string | null;
  description: string | null;
  price: string;
  duration: string;
  status: string;
  created_at: string;
  updated_at: string;
  created_at_human: string;
}

export interface UserPackage {
  id: number;
  user_id: string;
  package_id: string;
  status: string;
  expiration_date: string;
  created_at: string;
  updated_at: string;
  package: PackageDetails;
}

export interface UserMail {
  id: number;
  user_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  otp: string | null;
  otp_verified_at: string | null;
  status: string;
}

export interface Payment {
  id: number;
  user_id: string;
  package_id: string;
  payment_type: string;
  amount: string;
  status: string;
  reference_code: string;
  transaction_id: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  image: string | null;
  sms_qty: string | null;
  type: string;
  created_at_human: string;
  image_url: string | null;
}

export interface Meta {
  id: number;
  user_id: string;
  type: string;
  key: string;
  value: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserDetails {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  otp: string | null;
  otp_verified_at: string;
  status: string;
  reference_code: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  created_at_human: string;
  categories: Category[];
  user_package: UserPackage;
  user_mails: UserMail[];
  payments: Payment[];
  metas: Meta[];
  meta_data: Meta[];
}

export const getDashboardData = async (): Promise<UserDetails> => {
  const res = await axiosInstance.get<{ data: { user_details: UserDetails } }>(
    "/dashboard"
  );
  return res.data.data.user_details;
};
