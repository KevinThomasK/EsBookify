const useFormatDate = () => {
  const formatDate = (date) => {
    const parts = date.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}-${month}-${year}`;
    }
    return date;
  };
  return formatDate;
};

export default useFormatDate;
