const useMinDate = () => {
  let date = new Date();
  let tdate = date.getDate();
  let month = date.getMonth() + 1;
  if (tdate < 10) {
    tdate = "0" + tdate;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();
  let minDate = year + "-" + month + "-" + tdate;
  return minDate;
};

export default useMinDate;
