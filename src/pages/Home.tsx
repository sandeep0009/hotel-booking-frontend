
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { MapPin, Star, Wifi, Coffee, Car, School as Pool } from "lucide-react";

import { useState } from "react";

function Home() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl text-center mb-12 max-w-2xl">
            Discover handpicked hotels for your next adventure. Best prices guaranteed.
          </p>
          

          <Card className="w-full max-w-4xl bg-white/95 backdrop-blur">
          <CardContent className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 p-6 items-end">
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-900">Location</label>
    <div className="relative">
      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input className="pl-10" placeholder="Where are you going?"   value={location}
  onChange={(e) => setLocation(e.target.value)}/>
    </div>
  </div>

    <Button className="w-full  mt-auto" size="lg" onClick={() => {
    if (location.trim()) {
      navigate(`/search-hotels?location=${encodeURIComponent(location)}`);
    }
  }}>
      Search Hotels
    </Button>
  
</CardContent>
          </Card>
        </div>
      </div>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
              name: "Luxury Resort & Spa",
              location: "Maldives",
              price: "$299",
              rating: 4.8,
            },
            {
              image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
              name: "Mountain View Lodge",
              location: "Switzerland",
              price: "$199",
              rating: 4.6,
            },
            {
              image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
              name: "Urban Boutique Hotel",
              location: "New York",
              price: "$249",
              rating: 4.7,
            },
          ].map((property, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{property.name}</h3>
                    <p className="text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{property.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">{property.price}</span>
                  <span className="text-sm text-muted-foreground">per night</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Wifi className="h-8 w-8" />,
                title: "Free Wi-Fi",
                description: "Stay connected with high-speed internet access",
              },
              {
                icon: <Coffee className="h-8 w-8" />,
                title: "Breakfast Included",
                description: "Start your day with a complimentary breakfast",
              },
              {
                icon: <Car className="h-8 w-8" />,
                title: "Free Parking",
                description: "Convenient parking facilities for all guests",
              },
              {
                icon: <Pool className="h-8 w-8" />,
                title: "Swimming Pool",
                description: "Relax and unwind in our swimming pools",
              },
            ].map((amenity, index) => (
              <div key={index} className="text-center">
                <div className="bg-background rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {amenity.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{amenity.title}</h3>
                <p className="text-muted-foreground">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;