import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";

export default function CabinTable() {
  const { cabins, isLoading } = useCabin();
  const [searchParams]= useSearchParams()

  if (isLoading) return <Spinner />;

  const filteredValues = searchParams.get("discount") || "all"

  let filteredCabins;

  if(filteredValues === "all") filteredCabins = cabins
  if(filteredValues === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount > 0)
  if(filteredValues === "without-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0)

  const sortBy = searchParams.get("sortBy") || "startDate-asc"

  const [field , direction ] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier)


  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body  data={sortedCabins} render={(cabin) => (<CabinRow key={cabin.id} cabin={cabin} />)}/>      
    </Table>
    </Menus>
  );
}
