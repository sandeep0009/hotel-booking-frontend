import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;


  const getBookingDetails = async () => {
    const res = await axiosInstance.get(`/all-bookings?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setBookings(res.data.bookings);
    setTotal(res.data.total);
  };

  const cancelBooking = async (id: string) => {
    await axiosInstance.delete(`/delete-booking/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    getBookingDetails();
  };

  useEffect(() => {
    getBookingDetails();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Hotel</th>
            <th className="border px-4 py-2">Check In</th>
            <th className="border px-4 py-2">Check Out</th>
            <th className="border px-4 py-2">Rooms</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking: any) => (
            <tr key={booking._id}>
              <td className="border px-4 py-2">{booking.hotel?.name}</td>
              <td className="border px-4 py-2">{new Date(booking.checkInDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{booking.noofroombooking}</td>
              <td className="border px-4 py-2">₹{booking.totalAmount}</td>
              <td className="border px-4 py-2">{booking.status}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2 rounded" onClick={() => alert(JSON.stringify(booking, null, 2))}>View</button>
                {booking.status !== "cancelled" && (
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => cancelBooking(booking._id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage(p => p + 1)}
          disabled={page * limit >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageBookings;
