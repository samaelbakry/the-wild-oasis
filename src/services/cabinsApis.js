import supabase from "./supaBase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);

    throw new Error("somthing went wrong in cabins services ❌");
  }

  return data;
}

export async function deleteCabin(id) {
  
const {data,  error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)
          
  if (error) {
    console.log(error);

    throw new Error("Cabin cannot be deleted ❌");
  }

  return data;
}

export async function createCabin(newCabin) {
const { data, error } = await supabase
  .from('cabins')
  .insert([newCabin])
  .select()
          
          
  if (error) {
    console.log(error);

    throw new Error("Cabin cannot be created ❌");
  }

  return data;
}
