import dayjs from "dayjs";
import { Op } from "sequelize";

export const DateCondition = ({
  startDate,
  endDate,
  date_label = "purchase_date",
}) => {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const parsedStartDate = dayjs(startDate);
  const parsedEndDate = dayjs(endDate);

  let dateCondition = {};

  if (
    parsedStartDate.isSame(currentDate, "day") &&
    parsedEndDate.isSame(currentDate, "day")
  ) {
    // If startDate and endDate are equal to current date, fetch data for the current month
    dateCondition = {
      [date_label]: {
        [Op.gte]: dayjs().startOf("month").format("YYYY-MM-DD"),
        [Op.lte]: dayjs().endOf("month").format("YYYY-MM-DD"),
      },
    };

    return dateCondition;
  }
  // Fetch data based on the given startDate and endDate
  dateCondition = {
    [date_label]: {
      [Op.gte]: parsedStartDate.format("YYYY-MM-DD"),
      [Op.lte]: parsedEndDate.format("YYYY-MM-DD"),
    },
  };
  return dateCondition;
};
