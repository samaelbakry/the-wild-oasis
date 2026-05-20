import { useForm } from "react-hook-form";
import styled from "styled-components";

import ProtoTypes from "prop-types";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

import Textarea from "../../ui/Textarea";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

CreateCabinForm.propTypes = {
  cabinToEdit: ProtoTypes.object,
  onCloseModal: ProtoTypes.func,
};

function CreateCabinForm({ cabinToEdit = {} , onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditing = Boolean(editId);
  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  });

  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditing)
      updateCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {reset() , onCloseModal()}
        },
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {reset() , onCloseModal()},
        },
      );
  }

  const isWorking = isCreating || isUpdating;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>

        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />

        {errors?.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>

        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />

        {errors?.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>

        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />

        {errors?.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>

        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",

            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
        />

        {errors?.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>

        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />

        {errors?.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>

        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditing ? false : "This field is required",
          })}
        />

        {errors?.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={()=> onCloseModal?.() }>
          Cancel
        </Button>

        <Button disabled={isWorking}>
          {isEditing ? "Update Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
