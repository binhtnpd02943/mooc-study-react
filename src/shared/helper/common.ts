export const capitalizeString = (str: string) => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};

export const capitalizeFirstLetter = (productName: string) => {
  return productName.charAt(0).toUpperCase() + productName.slice(1);
};

export const getGender = (isGender: Boolean) => {
  if (isGender) return 'Còn hàng';
  if (!isGender) return 'Hết hàng';

  return 'Còn hàng';
};

export const getStatusProduct = (quantity: number) : string => {
  if (quantity >= 1) return 'Còn hàng';
  if (quantity <= 0) return 'Hết hàng';

  return 'Còn hàng';
};

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
