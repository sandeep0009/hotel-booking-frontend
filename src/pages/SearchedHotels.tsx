import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { MapPin, Star } from "lucide-react";
import { axiosInstance } from "../utils/axios";

function SearchHotels() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchLocation = params.get("location") || "";

  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [searchInput, setSearchInput] = useState(searchLocation);
  const [loading, setLoading] = useState(false);

  const getHotels = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/get-all-hotel?page=${page}&limit=${limit}`);
     
      setHotels(res.data.data.data);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching hotels", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotels();
  }, [page]);

  const filteredHotels = hotels
    .filter((hotel:any) =>
      hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
    )
    .sort((a:number, b:number) => {
        //@ts-ignore
      if (sort === "price") return b.price - a.price;
      //@ts-ignore
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search-hotels?location=${searchInput}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Hotels in {searchLocation || "Unknown Location"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <aside className="bg-muted rounded-lg p-6 h-fit sticky top-20">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Search by Place</label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search Location"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button type="submit" className="mt-3 w-full">
                Search
              </Button>
            </div>

            <div>
              <label className="text-sm font-semibold">Sort By</label>
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant={sort === "price" ? "default" : "outline"}
                  onClick={() => setSort("price")}
                >
                  Price: High to Low
                </Button>
                <Button
                  variant={sort === "rating" ? "default" : "outline"}
                  onClick={() => setSort("rating")}
                >
                  Rating: High to Low
                </Button>
              </div>

            </div>

            <div className="pt-2">
    <Button
      type="button"
      variant="destructive"
      className="w-full"
      onClick={() => {
        setSearchInput("");
        setSort("");
        navigate("/search-hotels");
      }}
    >
      Clear Filters
    </Button>
  </div>
          </form>
        </aside>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading hotels...</p>
          ) : filteredHotels.length ? (
            filteredHotels.map((hotel: any) => (
              <Card key={hotel._id} className="overflow-hidden">
                <div className="relative h-40">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{hotel.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                  </p>

                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{hotel.rating}</span>
                  </div>

                  <p className="text-lg font-semibold mt-3">
                    ${hotel.price} / night
                  </p>

                  <div className="mt-4 flex justify-between">
                    <Button variant="outline">View More</Button>
                    <Button onClick={()=>navigate(`/booking/${hotel._id}`)}>Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No hotels found for this location.</p>
          )}
        </section>
      </div>
      <div className="flex justify-center mt-8 gap-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <span className="mt-2">Page {page} of {totalPages}</span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default SearchHotels;
