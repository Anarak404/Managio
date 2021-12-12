export const isBlob = (file: any): file is Blob => {
  return file instanceof Blob;
};
