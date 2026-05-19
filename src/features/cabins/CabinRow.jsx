import PropTypes from "prop-types";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { IoDuplicateOutline } from "react-icons/io5";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const Btns = styled.div`
 display: flex;
 align-items: center;
 gap: 14px;
`;

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { id: cabinId, name, maxCapacity, regularPrice, image, discount } = cabin;

 const { isPending, deleteCabinFn } = useDeleteCabin()
 const {createCabin} = useCreateCabin()

 function handleDuplicate(){
  createCabin({
    name:`copy of ${name}`,
    maxCapacity,
    regularPrice,
    image,
    discount,
  })
 }


  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount}</Discount>
       <Btns>
         <button onClick={handleDuplicate}>
          <IoDuplicateOutline />
        </button>
         <button disabled={isPending} onClick={() => deleteCabinFn(cabinId)}>
          {isPending ? "deleting..." : <HiTrash />}
        </button>
        <button onClick={()=>setShowForm((show)=>!show)}>
         <HiPencil />
        </button>
       </Btns>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin}/>}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    image: PropTypes.string,
    discount: PropTypes.number,
  }).isRequired,
};
