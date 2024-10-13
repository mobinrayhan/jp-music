export const categorizeAudios = (audioDetailsList) => {
  const today = new Date();

  const categories = {
    today: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  };

  audioDetailsList.forEach((audio) => {
    const downloadDate = new Date(audio.downloadInfo.date);
    const timeDiff = today - downloadDate; // Difference in milliseconds

    const oneDay = 1000 * 60 * 60 * 24;
    const oneWeek = oneDay * 7;
    const oneMonth = oneDay * 30;

    if (timeDiff < oneDay) {
      categories.today.push(audio);
    } else if (timeDiff < oneWeek) {
      categories.lastWeek.push(audio);
    } else if (timeDiff < oneMonth) {
      categories.lastMonth.push(audio);
    } else {
      categories.older.push(audio);
    }
  });

  return categories;
};
