import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllComplaints,
  fetchComplaintById,
  resetComplaintDetails,
} from "@/store/admin/complaintSlice";
import { Badge } from "../../components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

function ComplainView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { complaintList, complaintDetails, loading } = useSelector(
    (state) => state.adminComplaint
  );
  const { toast } = useToast();
  const [loader, setLoader] = useState(null);

  async function handleFetchComplaintDetails(getId) {
    await dispatch(fetchComplaintById(getId)).unwrap();
    setOpenDetailsDialog(true);
  }

  async function handleSendEmail() {
    setLoader("loading");
    if (!complaintDetails) return;
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/complaints/send-complaint-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: complaintDetails.userEmail,
            complaintId: complaintDetails._id,
            orderId: complaintDetails.orderId,
            complaintType: complaintDetails.complaintType,
            description: complaintDetails.description,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Email sent successfully!",
          variant: "success",
        });
        dispatch(fetchAllComplaints());
      } else {
        toast({
          title: "Failed to send email: " + data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error sending email: " + error.message,
        variant: "destructive",
      });
    }
    setLoader(null);
  }

  useEffect(() => {
    dispatch(fetchAllComplaints());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          All Complaints
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading complaints...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Complaint Type</TableHead>
                <TableHead>Response</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaintList && complaintList.length > 0 ? (
                complaintList.map((complaint) => (
                  <TableRow key={complaint?._id}>
                    <TableCell>{complaint?._id}</TableCell>
                    <TableCell>{complaint?.userEmail}</TableCell>
                    <TableCell>{complaint?.orderId}</TableCell>
                    <TableCell>
                      <Badge className="py-1 px-3 bg-gray-900">
                        {complaint?.complaintType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                          complaint?.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {complaint?.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleFetchComplaintDetails(complaint?._id)
                        }
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="7" className="text-center">
                    No complaints found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Complaint Details Dialog */}
      {openDetailsDialog && complaintDetails && (
        <Dialog
          open={openDetailsDialog}
          onOpenChange={() => {
            setOpenDetailsDialog(false);
            dispatch(resetComplaintDetails());
          }}
        >
          <DialogContent>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              View full details of the selected complaint.
            </DialogDescription>
            <div className="grid gap-4 mt-4">
              <p>
                <strong>Complaint ID:</strong> {complaintDetails._id}
              </p>
              <p>
                <strong>User Email:</strong> {complaintDetails.userEmail}
              </p>
              <p>
                <strong>Order ID:</strong> {complaintDetails.orderId}
              </p>
              <p>
                <strong>Complaint Type:</strong>{" "}
                {complaintDetails.complaintType}
              </p>
              <p>
                <strong>Description:</strong> {complaintDetails.description}
              </p>
              {complaintDetails.defectImage && (
                <img
                  src={complaintDetails.defectImage}
                  alt="Defect"
                  className="w-40 h-40 object-cover rounded-md"
                />
              )}
              <Button onClick={handleSendEmail} className="mt-4">
                {loader ? "Sending" : "Send Complaint Email"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

export default ComplainView;
