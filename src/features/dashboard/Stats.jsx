import PropTypes from "prop-types";
import { HiOutlineBanknotes, HiOutlineBriefcase,HiOutlineChartBar,} from "react-icons/hi2";
import { HiOutlineCalendar } from "react-icons/hi";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ bookings, confirmedStays , numDays , cabinsCount }) {

  const numOfBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkin = confirmedStays.length;

  const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinsCount)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numOfBookings}
        icon={<HiOutlineBriefcase />}
      />

      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />

      <Stat
        title="Check ins"
        color="indigo"
        value={checkin}
        icon={<HiOutlineCalendar />}
      />

      <Stat
        title="Occupancy rate"
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

Stats.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      totalPrice: PropTypes.number.isRequired,
    }),
  ).isRequired,

  confirmedStays: PropTypes.arrayOf(PropTypes.object).isRequired,
  numDays:PropTypes.number.isRequired,
  cabinsCount:PropTypes.number.isRequired

};
