import supabase, { supabaseUrl } from "./supaBase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);

    throw new Error("somthing went wrong in cabins services ❌");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);

    throw new Error("Cabin cannot be deleted ❌");
  }

  return data;
}

export async function createEditCabin(newCabin , id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath ? newCabin.image :`${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  //1. create or update cabin

  let query = supabase.from("cabins")

  //a) create

  if(!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  

  //b) edit

  if(id) query = query.update({ ...newCabin, image: imagePath }).eq("id" , id);

  const { data, error } = await query.select().maybeSingle()

  //2.upload image to storage

   if(hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  //3. if there is an error in uploading the image delete the created cabin

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error(storageError.message);
  }

  if (error) {
    console.log(error);
    throw new Error("Cabin cannot be created ❌");
  }

  return data;
}
