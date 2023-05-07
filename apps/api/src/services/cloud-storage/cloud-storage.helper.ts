export const getFileName = (url: string) => {
  const splitFileName = url.split('%2F');
  return splitFileName[splitFileName.length - 1];
};
