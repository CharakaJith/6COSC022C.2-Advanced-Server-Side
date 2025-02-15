const field_validator = require('../util/field_validator');

const dateService = {
  calculateAge: async (date) => {
    // Validate date string
    await field_validator.validate_date_format(date);
    const birthDate = await field_validator.validate_and_get_date(date);

    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if birthday occurred this year
    const isBdayPassed =
      currentDate.getMonth() > birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate());

    if (!isBdayPassed) {
      age--;
    }

    const nextBday = await daysTillNextDay(birthDate, currentDate, isBdayPassed);

    return {
      message: 'Age calculated!',
      age: age,
      nextBday,
    };
  },
};

async function daysTillNextDay(birth, current, isPassed) {
  if (isPassed) {
    birth.setFullYear(current.getFullYear() + 1);
  }

  let remainingMonths = birth.getMonth() - current.getMonth();
  let remainingDays = birth.getDate() - current.getDate();

  // check date in month
  if (remainingDays < 0) {
    remainingMonths--;

    // set day to previous month
    const prevMonth = new Date(birth);
    prevMonth.setMonth(birth.getMonth() - 1);
    remainingDays += new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate(); // get days of previous month
  }

  // check bday in next year
  if (remainingMonths < 0) {
    remainingMonths += 12;
  }

  return `${remainingMonths} months and ${remainingDays} days until your next birthday!`;
}

module.exports = dateService;
