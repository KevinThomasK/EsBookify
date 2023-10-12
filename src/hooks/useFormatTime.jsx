const useFormatTime = () => {
  const formatTime = (time) => {
    const parts = time.split(":");
    if (parts.length === 2) {
      const [hour, minute] = parts;
      let period = "AM";
      let formattedHour = parseInt(hour, 10);

      if (formattedHour >= 12) {
        period = "PM";
        if (formattedHour > 12) {
          formattedHour -= 12;
        }
      }

      return `${formattedHour}:${minute} ${period}`;
    }
    return time;
  };

  return formatTime;
};

export default useFormatTime;
