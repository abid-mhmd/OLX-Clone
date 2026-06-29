export function validateProduct(data) {
  if (!data.title.trim()) {
    return "Title is required";
  }
  if (!data.price) {
    return "Price is required";
  }
  if (!data.category) {
    return "Category is required";
  }
  if (!data.location.trim()) {
    return "Location is required";
  }
  if (!data.description.trim()) {
    return "Description is required";
  }
  if (data.images.length === 0) {
    return "Please upload at least one image";
  }
  return null;
}
