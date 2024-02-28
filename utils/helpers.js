module.exports = {
    format_date: (date) => {
      if (!date) {
        return "Invalid Date";
      }
  
      return new Date(date).toLocaleDateString();
    }
  };