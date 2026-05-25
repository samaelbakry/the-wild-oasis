import PropTypes from "prop-types";
import styled from "styled-components";
import Tag from "../../ui/Tag";
import {Flag} from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({activity}) {
  const { guests , status , numNights , id}= activity
  return (
   <StyledTodayItem>
  {status === "unconfirmed" ? (
    <Tag type="green">arriving</Tag>
  ) : (
    <Tag type="blue">departing</Tag>
  )}

  <Flag src={guests.countryFlag} />
  <Guest>{guests.fullName}</Guest>

  <div>
    {numNights} {numNights > 1 ? "nights" : "night"}
  </div>

  {status === "unconfirmed" ? (
    <Button variation="primary" size="small" as={Link} to={`/checkin/${id}`}>
      Check in
    </Button>
  ) : (
    <CheckoutButton bookingId={id} />
  )}
</StyledTodayItem>
  )
}

TodayItem.propTypes = {
  activity: PropTypes.shape({
    guests: PropTypes.shape({
      countryFlag: PropTypes.string,
      fullName: PropTypes.string,
    }).isRequired,
    status: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};
