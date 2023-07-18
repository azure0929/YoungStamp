import { useEffect, useState, useCallback, useRef } from "react";
import generateCalendar from "@/Common/calendar";
import "./Calendar.scss";
import axios from "axios";

export default function Calendar(props: Props) {
  const {
    month,
    year,
    setMonth,
    setYear,
    today,
    setToday,
    category,
    backgroundColor,
  } = props;
  const [totalDates, setTotalDates] = useState<number[]>([]);
  const makeCalendar = useCallback(
    (year: number, month: number) => {
      setTotalDates(generateCalendar(year, month));
    },
    [month, year]
  );
  useEffect(() => {
    if (!month) {
      setYear(year - 1);
      setMonth(12);
    } else if (month > 12) {
      setYear(year + 1);
      setMonth(1);
    }
    makeCalendar(year, month);

    (async () => {
      await tempApi();
    })();
  }, [month, year]);

  const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //const today = new Date().getDate();
  const sth = useRef<Map<string, number>>();

  async function tempApi() {
    try {
      const res = await axios.get("/kdt5/expenses/summary", {
        params: {
          period: "daily",
          userId: "team6",
          category: category,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: ResponseCalendar[] = res.data;
      const arr: CalendarMap[] = data.map((v) => [v._id, v.totalAmount]);
      sth.current = new Map<string, number>(arr);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="calendar">
      <div className="days">
        {dayList.map((v) => (
          <div className="day" key={v}>
            {v}
          </div>
        ))}
      </div>
      <div className="dates">
        {totalDates &&
          totalDates.map((date, i) => {
            const last = totalDates.indexOf(1, 8);
            return (
              <div
                className={`date ${date > i ? "gray" : ""} ${
                  last <= i && last != -1 ? "gray" : ""
                } ${date === today ? "today" : ""}`}
                style={{
                  backgroundColor: date === today ? backgroundColor : "",
                }}
                onClick={() => {
                  setToday(date);
                }}
                key={i}
              >
                <div>{date}</div>
                {!(date > i || last <= i) && (
                  <span>
                    {sth.current?.get(
                      `${year}-${month < 10 ? "0" + month : month}-${
                        date < 10 ? "0" + date : date
                      }`
                    )}
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
