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

interface MonthlySavings {
  _id: string;
  totalAmount: number;
}

interface MonthlySavingsProps {
  activeMonth: string;
}

const MonthlySavings: React.FC<MonthlySavingsProps> = ({ activeMonth }) => {
  const [chartData, setChartData] = useState<MonthlySavings[]>([]);
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
            category: "삿다치고"
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setPeriod(response.data);
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(chartData);

  return (
    <div className="chart">
      {chartData && (
        <div>
          <Bar
            data={{
              // 변경된 부분: activeMonth에 따라 labels 변경
              labels: activeMonth === "선택없음" ? chartData.map((item) => item._id) : [activeMonth],
              datasets: [
                {
                  label: "월간 저축양",
                  data: activeMonth === "선택없음" ? chartData.map((item) => item.totalAmount) : [chartData.find((item) => item._id === activeMonth)?.totalAmount || 0],
                  backgroundColor: "rgba(92, 187, 144, 0.8)",
                  borderColor: "rgba(92, 187, 144, 1)",
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

export default MonthlySavings;
