import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyCalories {
  _id: string;
  totalAmount: number;
}

interface MonthlyCaloriesProps {
  activeMonth: string;
}

const MonthlyCalories: React.FC<MonthlyCaloriesProps> = ({ activeMonth }) => {
  const [chartData, setChartData] = useState<MonthlyCalories[]>([]);
  const [period, setPeriod] = useState("monthly"); 
  
  useEffect(() => {
    if (activeMonth === "선택없음") {
      setPeriod("monthly");
    } else {
      setPeriod(activeMonth);
    }
  }, [activeMonth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/kdt5/expenses/summary", {
          params: {
            period: period,
            userId: "team6",
            category: "다이어트"
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [period]);

  console.log(chartData);

  return (
    <div className="chart">
      {chartData && (
        <div>
          <Bar
            data={{
              labels: activeMonth === "선택없음" ? chartData.map((item) => item._id) : [activeMonth],
              datasets: [
                {
                  label: "월간 칼로리",
                  data: activeMonth === "선택없음" ? chartData.map((item) => item.totalAmount) : [chartData.find((item) => item._id === activeMonth)?.totalAmount || 0],
                  backgroundColor: "rgba(83, 188, 83, 0.3)",
                  borderColor: "rgba(83, 188, 83, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MonthlyCalories;
