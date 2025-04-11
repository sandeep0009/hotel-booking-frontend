import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { axiosInstance } from "../utils/axios";
import { Eye, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

interface Hotel {
  _id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  totalRooms: number;
  availableRooms: number;
}

const AdminDashboard = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    rating: "",
    description: "",
    image: "",
    totalRooms: "",
    availableRooms: "",
  });

  const limit = 5;

  const getHotels = async () => {
    try {
      const res = await axiosInstance.get(`/get-all-hotel?page=${page}&limit=${limit}`);
      setHotels(res.data.data.data);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching hotels", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/delete-hotel/${id}`);
      getHotels();
    } catch (error) {
      console.error("Error deleting hotel", error);
    }
  };

  const openModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHotel(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        totalRooms: Number(formData.totalRooms),
        availableRooms: Number(formData.availableRooms),
      };
      await axiosInstance.post("/create-hotel", payload);
      getHotels();
      setFormData({
        name: "",
        location: "",
        price: "",
        rating: "",
        description: "",
        image: "",
        totalRooms: "",
        availableRooms: "",
      });
    } catch (error) {
      console.error("Error creating hotel", error);
    }
  };

  useEffect(() => {
    getHotels();
  }, [page]);

  return (
    <div className="p-6">
      <div className="flex items-end justify-end mb-4">
        <Dialog >
          <DialogTrigger asChild>
            <Button>Create</Button>
          </DialogTrigger>
          <DialogContent className="h-full">
            <DialogHeader>
              <DialogTitle>Create New Hotel</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Name</Label>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Location</Label>
                <Input name="location" value={formData.location} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Price</Label>
                <Input name="price" type="number" value={formData.price} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Rating</Label>
                <Input name="rating" type="number" value={formData.rating} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Total Rooms</Label>
                <Input name="totalRooms" type="number" value={formData.totalRooms} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Available Rooms</Label>
                <Input name="availableRooms" type="number" value={formData.availableRooms} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input name="image" value={formData.image} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea name="description" value={formData.description} onChange={handleInputChange} />
              </div>
              <Button onClick={handleCreate}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">S.No</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Location</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Available Rooms</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.map((hotel, index) => (
              <tr key={hotel._id}>
                <td className="px-6 py-4 whitespace-nowrap">{(page - 1) * limit + index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hotel.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hotel.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">${hotel.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hotel.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {hotel.availableRooms}/{hotel.totalRooms}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2 flex items-center">
                  <Button variant="outline" size="sm" onClick={() => openModal(hotel)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(hotel._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <Button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>
          Previous
        </Button>
        <span className="self-center text-sm">Page {page} of {totalPages}</span>
        <Button disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
      {isModalOpen && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-xl shadow-xl relative">
            <h2 className="text-xl font-bold mb-4">Hotel Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedHotel.name}</p>
              <p><strong>Location:</strong> {selectedHotel.location}</p>
              <p><strong>Price:</strong> ${selectedHotel.price}</p>
              <p><strong>Rating:</strong> {selectedHotel.rating}</p>
              <p><strong>Description:</strong> {selectedHotel.description}</p>
              <p><strong>Rooms:</strong> {selectedHotel.availableRooms} available out of {selectedHotel.totalRooms}</p>
              <img src={selectedHotel.image} alt="Hotel" className="mt-2 rounded w-full h-48 object-cover" />
            </div>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
