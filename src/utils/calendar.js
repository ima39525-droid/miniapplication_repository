// Получаем все дни месяца
export const getMonthDays = (year, month) => {
  const days = [];
  const date = new Date(year, month, 1); // первый день месяца

  while (date.getMonth() === month) {
    days.push(new Date(date)); // добавляем копию даты
    date.setDate(date.getDate() + 1); // следующий день
  }

  return days;
};

// Проверка, является ли день запланированным
export const isPlannedDay = (habit, day) => {
  if (!habit.startDate) return false;
  const start = new Date(habit.startDate);
  const current = new Date(day);

  // обнуляем часы, минуты, секунды и миллисекунды
  start.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((current - start) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return false;

  switch (habit.frequency) {
    case "ежедневно":
      return true;
    case "через день":
      return diffDays % 2 === 0;
    case "раз в неделю":
      return diffDays % 7 === 0;
    default:
      return false;
  }
};
