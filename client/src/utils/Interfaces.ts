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
