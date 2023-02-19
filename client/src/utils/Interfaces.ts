export interface UserProfile {
  workDescription?: string;
  profileSrc?: string;
  activities: Select[];
  selectedActivities: Select[];
  mobilePhone: string;
  city: string;
  radius: number;
}

export interface Select {
  label: string;
  value: number;
}

export interface AdminUser {
  name: string;
  lastName: string;
  email: string;
  registrationDate: Date;
  banned: boolean;
  approved: boolean;
}
