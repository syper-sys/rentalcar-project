import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookingRequest, BookingRequestParams } from "@/lib/api/cars";

interface BookingCarVariables {
  carId: string;
  bookingData: BookingRequestParams;
}

export function useBookCar() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: ({carId, bookingData}: BookingCarVariables)  => createBookingRequest(carId, bookingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingRequest"] });
    },
  });

  return {
    bookCar: mutateAsync,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
}
