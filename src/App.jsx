import React, { useEffect, useState } from 'react';
import RouteMap from './components/Map/RouteMap';
import ControlPanel from './components/Sidebar/ControlPanel';
import { fetchLocalCoffeeShops } from './services/destinations';
import { fetchRoute } from './services/routing';

function App() {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [isRouting, setIsRouting] = useState(false);

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

  return (
    <div className="app-container" style={{ width: '100%', height: '100%', position: 'relative' }}>

      {/* Map rendering layer */}
      <RouteMap shops={coffeeShops} routeCoords={currentRoute} onNavigate={handleNavigate} />

      {/* Control Panel overlay layer */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
        <ControlPanel isRouting={isRouting} />
      </div>

    </div>
  );
}

export default App;
