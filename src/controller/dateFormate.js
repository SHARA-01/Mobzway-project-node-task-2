import { format } from 'date-fns';

const formatDate = (date, dateFormat) => {
  return format(new Date(date), dateFormat);
};

export { formatDate };
