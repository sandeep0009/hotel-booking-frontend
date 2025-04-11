import {  useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { axiosInstance } from "../utils/axios";

const Booking = () => {

  const {id:hotelId} = useParams();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [noofroombooking, setNoofRoomBooking] = useState<number>(1);
  
  const user = useSelector((state: RootState) => state.user.user);
  const token=localStorage.getItem('token');
  const navigate=useNavigate();

  const handleBooking = async() => {
    if (!checkInDate || !checkOutDate) return alert("Please select dates");
    const bookingData = {
      user: user?.id, 
      hotel: hotelId ,
      checkInDate,
      checkOutDate,
      totalAmount: 0, 
      transactionId: "txn_" + Date.now(),
      status: "booked",
      noofroombooking,
    };
    const res=await axiosInstance.post(`/create-booking/${hotelId}`, bookingData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    if(res.status===201){
        navigate('/booking-details');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <Card className="shadow-lg border-0">
        <CardHeader className="p-6">
          <CardTitle className="text-2xl ">Book Your Stay</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-In Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-Out Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    initialFocus
                    disabled={(date) => !checkInDate || date <= checkInDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Rooms</label>
            <Input
              type="number"
              min={1}
              max={10}
              value={noofroombooking}
              onChange={(e) => setNoofRoomBooking(Number(e.target.value))}
              className="border-gray-300"
            />
          </div>


          {checkInDate && checkOutDate && (
            <div className=" p-4 rounded-md">
              <h3 className="font-medium  mb-2">Booking Summary</h3>
              <div className="text-sm space-y-1 text-gray-700">
                <p>Check-in: {format(checkInDate, "PPP")}</p>
                <p>Check-out: {format(checkOutDate, "PPP")}</p>
                <p>Rooms: {noofroombooking}</p>
                <p>
                  Duration: {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights
                </p>
              </div>
            </div>
          )}

          <Button 
            onClick={handleBooking} 
            className="w-full text-white"
          >
            Confirm Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking;