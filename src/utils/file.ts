/* 
  When a file is sent to the backend using FromData it is given a fieldname. 
  this acts as an object key. This function returns the AWS url key associated with that file name.
*/
/* 
 Usefull for displaying image files as this creates a readable Url
*/
export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

/* 
  When a file is sent to the backend using FromData it is given a fieldname. 
  Ex: form.append(img, <file>) img is the feildname
 This function returns the AWS url key associated with that file name.
*/
export const findKeyByFieldName = (
  arr: { key: string; fieldname: string }[],
  fieldname: string
) => {
  const fileKey = arr.find((item: { key: string; fieldname: string }) => {
    return item.fieldname === fieldname;
  });
  return fileKey?.key;
};
