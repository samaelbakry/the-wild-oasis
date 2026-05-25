import styled from "styled-components";
import { useRecentBooking } from "./useRecentBookings";
import { useStaysBooking } from "./useStaysBooking";
import { useCabin } from "../cabins/useCabin";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const {bookingsDates , isLoading:loadingBookings } = useRecentBooking()
  const {confirmedStays , isLoading:loadingStays , numDays} = useStaysBooking()
  const {cabins , isLoading} = useCabin()


  if(loadingBookings || loadingStays || isLoading ) return <Spinner/>
  
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookingsDates} confirmedStays={confirmedStays}  numDays={numDays} cabinsCount={cabins.length}/>
      <TodayActivity/>
      <DurationChart  confirmedStays={confirmedStays}/>
      <SalesChart numDays={numDays}  bookings={bookingsDates} />
    </StyledDashboardLayout>
  );
}
