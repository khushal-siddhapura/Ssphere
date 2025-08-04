import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import axios from "axios"; 

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const CategoryChart = () => {
  const [categorySalesData, setCategorySalesData] = useState([]);

  useEffect(() => {
    const fetchCategorySalesData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sales-by-category");

        const transformedData = Object.keys(response.data).map((key) => ({
          name: key, 
          value: response.data[key],
        }));

        setCategorySalesData(transformedData);
      } catch (error) {
        console.error("Error fetching category sales data:", error);
      }
    };

    fetchCategorySalesData();
  }, []);

  return (
    <div className="w-full h-[250px] bg-white rounded-lg ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categorySalesData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {categorySalesData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
