import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import CategoryChart from "./CategoryChart";

const TopProductsTable = () => {
  const { products, loading, error } = useSelector(
    (state) => state.topProducts
  );

  return (
    <div className="flex space-x-4">
      <div className="w-[65%] p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Top Selling Products
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productName}</TableCell>
              <TableCell className="text-right">
                {product.totalQuantity.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ${product.totalRevenue.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {product.avgRating
                  ? product.avgRating.toFixed(2)
                  : "No Reviews"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="w-[45%] p-6 bg-white shadow-lg rounded-lg">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Sales By Category
      </h3>
      <CategoryChart/>
    </div>
    </div>
  );
};

export default TopProductsTable;
