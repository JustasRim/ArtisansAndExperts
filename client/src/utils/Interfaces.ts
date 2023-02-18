export interface UserProfile {
  workDescription?: string;
  profileSrc?: string;
  activities: { label: string; value: number }[];
  mobilePhone: string;
  city: string;
  radius: number;
}
