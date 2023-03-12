import { Status } from './Enums';

export interface UserProfile {
  workDescription?: string;
  profileSrc?: string;
  activities: SelectOption[];
  selectedActivities: SelectOption[];
  mobilePhone: string;
  city: string;
  radius: number;
}

export interface SelectOption {
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

export interface Expert {
  id: string;
  name: string;
  workDescription: string;
  city: string;
  radius: number;
  profileSrc: string;
  registrationDate: Date;
  rating: number;
  activities: string[];
}

export interface Project {
  id: string;
  activityId: number;
  timeLine: string;
  city: string;
  name: string;
  description: string;
  status: Status;
  images: Image[];
}

export interface Image {
  id: string;
  source: string;
}

export interface ProjectBriefing {
  id: string;
  name: string;
  activity: string;
  createdAt: Date;
  status: Status;
}
