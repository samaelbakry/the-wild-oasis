import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";
import { useState, useEffect } from "react";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkin , isPending } = useCheckin()
  const { settings , isLoading:isLoadingSettings } = useSettings()

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return <p>Booking not found</p>;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numGuests * numNights

  function handleCheckin() {
    if(!confirmPaid) return

    if(addBreakfast){
      checkin({bookingId , breakfast:{
        hasBreakfast:true,
        extrasPrice:optionalBreakfast,
        totalPrice :totalPrice + optionalBreakfast

      }})

    }else{
      checkin({bookingId , breakfast:{}})
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && <Box>
        <CheckBox
          checked={addBreakfast}
          onChange={() =>{ 
            setAddBreakfast((addBreakfast) => !addBreakfast) 
            setConfirmPaid(false)
          }}
          id="breakfast"
        >
          want to add breakfast to - {formatCurrency(optionalBreakfast)} ?
        </CheckBox>
      </Box>}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid) }
          disabled={confirmPaid || isPending}
          id="confirm"
        >
          i am {guests.fullName} confirms that i paid the total amout - {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isPending} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
