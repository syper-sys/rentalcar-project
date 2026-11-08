import { Car } from "@/types/car";
import api from "@/lib/api/api";

export interface GetCarsParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  perPage?: number;
  page?: number;
}

export interface BookingRequestParams {
  name: string;
  email: string;
  comment: string;
}

export interface BookingRequestResponse {
  message: string;
}

export interface GetCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface GetCarsFiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export async function getCars(
  params: GetCarsParams = {},
): Promise<GetCarsResponse> {
  const { data } = await api.get<GetCarsResponse>("/cars", { params });
  return data;
}

export async function getCarsFilters(): Promise<GetCarsFiltersResponse> {
  const { data } = await api.get<GetCarsFiltersResponse>("/cars/filters");
  return data;
}

export async function getCarById(carId: string) {
  const { data } = await api.get<Car>(`/cars/${carId}`);
  return data;
}

export async function createBookingRequest(
  carId: string,
  bookingData: BookingRequestParams,
): Promise<BookingRequestResponse> {
  const { data } = await api.post<BookingRequestResponse>(
    `/cars/${carId}/booking-requests`,
    bookingData
  );
  return data;
}
