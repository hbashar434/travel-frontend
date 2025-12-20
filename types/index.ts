export interface User {
  _id: string;
  email: string;
  name?: string;
  role: "user" | "admin";
}

export interface Package {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  destination?: string;
  category?: string;
  meetingPoint?: string;
  images?: string[];
  pricePerPerson: number;
  discountPrice?: number;
  durationDays?: number;
  durationNights?: number;
  availableDates?: string[];
  minPersons?: number;
  maxPersons?: number;
  included?: string[];
  excluded?: string[];
  status?: "active" | "inactive";
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  _id: string;
  userId: string;
  packageId: string;
  travelDate: string;
  endDate?: string;
  travelers: number;
  notes?: string;
  totalPrice: number;
  unitPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  packageTitle?: string;
  packageSlug?: string;
  packageDestination?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface CreateBookingData {
  packageId: string;
  travelDate: string;
  travelers: number;
  notes?: string;
}

export interface CreatePackageData {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  destination?: string;
  category?: string;
  meetingPoint?: string;
  images?: string[];
  pricePerPerson: number;
  discountPrice?: number;
  durationDays?: number;
  durationNights?: number;
  availableDates?: string[];
  minPersons?: number;
  maxPersons?: number;
  included?: string[];
  excluded?: string[];
  status?: "active" | "inactive";
  isFeatured?: boolean;
}
