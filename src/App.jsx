import React, { useEffect, useState } from 'react';
import RouteMap from './components/Map/RouteMap';
import ControlPanel from './components/Sidebar/ControlPanel';
import { fetchLocalCoffeeShops } from './services/destinations';
import { fetchRoute } from './services/routing';

// Simple Haversine distance calculator
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

function App() {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [isRouting, setIsRouting] = useState(false);
  const [routeLength, setRouteLength] = useState(50);

  // Mock user location near NY
  const userLocation = [40.75, -73.98];

  useEffect(() => {
    const loadShops = async () => {
      const data = await fetchLocalCoffeeShops(userLocation[0], userLocation[1]);
      setCoffeeShops(data);
    };
    loadShops();
  }, []);

  const handleNavigate = async (shop) => {
    setIsRouting(true);
    const coords = await fetchRoute(userLocation, [shop.lat, shop.lng]);
    if (coords) {
      setCurrentRoute(coords);
    }
    setIsRouting(false);
  };

  const handleSurpriseMe = async () => {
    if (visibleShops.length === 0) return;
    const randomShop = visibleShops[Math.floor(Math.random() * visibleShops.length)];
    await handleNavigate(randomShop);
  };

  // Filter shops based on selected route length (assuming round trip, so distance < radius/2)
  const visibleShops = coffeeShops.filter(shop => {
    const dist = calculateDistance(userLocation[0], userLocation[1], shop.lat, shop.lng);
    return dist <= (routeLength / 2);
  });

  return (
    <div className="app-container" style={{ width: '100%', height: '100%', position: 'relative' }}>

      {/* Map rendering layer */}
      <RouteMap shops={visibleShops} routeCoords={currentRoute} onNavigate={handleNavigate} routeLength={routeLength / 2} />

      {/* Control Panel overlay layer */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
        <ControlPanel
          isRouting={isRouting}
          routeLength={routeLength}
          setRouteLength={setRouteLength}
          onSurpriseMe={handleSurpriseMe}
        />
      </div>

    </div>
  );
}

export default App;
