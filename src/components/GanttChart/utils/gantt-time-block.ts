import dayjs from "dayjs";

/**
 * 根据月份获取该月的天数数组
 * @param targetTime 目标时间（可以是 Date、字符串或 dayjs 对象）
 * @returns 该月的日期数组 [1, 2, ..., 30/31]
 */
export const getDaysList = (targetTime: string | Date | dayjs.Dayjs, currentTime?: string) => {
  const currentMonth = dayjs(targetTime); // 确保输入被转换为 dayjs 对象
  const daysArray: number[] = [];
  const daysInMonth = currentMonth.daysInMonth(); // 获取该月的天数

  for (let day = Number(currentTime) ? Number(currentTime) : 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }
  return daysArray;
};
