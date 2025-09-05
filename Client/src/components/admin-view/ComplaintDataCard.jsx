import { Progress } from "@/components/ui/Progress.jsx";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllComplaints } from "@/store/admin/complaintSlice";

const getMonthName = (monthIndex) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[monthIndex - 1];
};

const ComplaintDataCard = () => {
  const { complaintList, complaintDetails, loading } = useSelector(
    (state) => state.adminComplaint
  );
  // useEffect(() => {
  //   dispatch(fetchAllComplaints());
  // }, [dispatch]);

  const groupComplaintsByMonth = (complaints) => {
    const groupedData = complaints.reduce((acc, complaint) => {
      const createdAt = new Date(complaint.createdAt);
      const monthYear = `${createdAt.getFullYear()}-${
        createdAt.getMonth() + 1
      }`;

      // Initialize count for this month/year
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear]++;
      return acc;
    }, {});

    // Convert grouped data to an array of objects for Recharts
    const trendData = Object.keys(groupedData).map((monthYear) => {
      return {
        month: monthYear,
        count: groupedData[monthYear],
      };
    });

    // Sort by month (optional, if you want to sort by month)
    return trendData.sort((a, b) => new Date(a.month) - new Date(b.month));
  };

  const monthlyTrendData = groupComplaintsByMonth(complaintList);

  const totalComplaints = complaintList.length;

  const uniqueComplaintType = [
    ...new Set(complaintList.map((complaint) => complaint.complaintType)),
  ];

  const complaintTypeCounts = complaintList.reduce((acc, complaint) => {
    acc[complaint.complaintType] = (acc[complaint.complaintType] || 0) + 1;
    return acc;
  }, {}); // complaint type unique with number of time repeat

  const complaintTypePercentages = uniqueComplaintType.map((type) => {
    const count = complaintTypeCounts[type];
    const percentage = ((count / totalComplaints) * 100).toFixed(2);
    return {
      complaintType: type,
      percentage: parseFloat(percentage),
    };
  });

  const solvedComplaints = complaintList.filter(
    (complaint) => complaint.status === "done"
  );
  const pendingComplaints = complaintList.filter(
    (complaint) => complaint.status === "pending"
  );
  const resolvedPercentage = (solvedComplaints.length / totalComplaints) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">
              Complaint Resolution Rate
            </span>
            <span className="text-sm font-medium">
              {resolvedPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={resolvedPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card className="p-4 bg-blue-50 border-blue-100">
            <div className="text-2xl font-bold text-blue-700">
              {totalComplaints}
            </div>
            <div className="text-xs text-gray-500">Total Complaints</div>
          </Card>
          <Card className="p-4 bg-green-50 border-green-100">
            <div className="text-2xl font-bold text-green-700">
              {solvedComplaints.length}
            </div>
            <div className="text-xs text-gray-500">Resolved</div>
          </Card>
          <Card className="p-4 bg-amber-50 border-amber-100 col-span-2">
            <div className="text-2xl font-bold text-amber-700">
              {pendingComplaints.length}
            </div>
            <div className="text-xs text-gray-500">Pending Resolution</div>
          </Card>
        </div>
      </div>

      <div className="md:col-span-1">
        <h3 className="text-sm font-medium mb-2">Complaint Categories</h3>
        <div className="space-y-2">
          {complaintTypePercentages &&
            complaintTypePercentages.map((category, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{category.complaintType}</span>
                  <span className="font-medium">{category.percentage}%</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
        </div>
      </div>

      <div className="md:col-span-1">
        <h3 className="text-sm font-medium mb-2">Monthly Trend</h3>
        <div className="h-[170px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyTrendData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(monthYear) => {
                  const monthIndex = parseInt(monthYear.split("-")[1], 10);
                  return getMonthName(monthIndex);
                }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDataCard;
