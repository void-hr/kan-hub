export const  getDayWithPostfix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  } else {
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
}
