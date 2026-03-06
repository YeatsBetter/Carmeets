import React from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ShopCard from '../CoffeeShops/ShopCard';

// Fix for default marker icons in Leaflet when using Vite/Webpack
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const RouteMap = ({ shops = [], routeCoords = null, onNavigate, children }) => {
    // Center roughly around US East Coast (NY to HV)
    const position = [41.0, -74.0];
    const defaultZoom = 8;
    const userLocation = [40.75, -73.98]; // Mock user location near NY

    // Custom icon for user location
    const userIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
            <MapContainer
                center={position}
                zoom={defaultZoom}
                style={{ width: '100%', height: '100%' }}
                zoomControl={false} // Disable default zoom to position it elsewhere if needed
            >
                {/* Premium Dark Theme Tile Layer - CartoDB Dark Matter */}
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Custom positioned Zoom Control */}
                <ZoomControl position="bottomright" />

                {/* User Location */}
                <Marker position={userLocation} icon={userIcon}>
                    <Popup>You are here</Popup>
                </Marker>

                {/* Render Coffee Shops */}
                {shops.map(shop => (
                    <Marker key={shop.id} position={[shop.lat, shop.lng]}>
                        <Popup className="premium-popup">
                            <ShopCard shop={shop} onNavigate={onNavigate} />
                        </Popup>
                    </Marker>
                ))}

                {/* Render Route if available */}
                {routeCoords && (
                    <Polyline
                        positions={routeCoords}
                        pathOptions={{
                            color: 'var(--accent-primary)',
                            weight: 5,
                            opacity: 0.8,
                            lineCap: 'round',
                            lineJoin: 'round',
                            className: 'route-polyline-animate'
                        }}
                    />
                )}

                {/* This will render routes, etc. passed as children */}
                {children}
            </MapContainer>
        </div>
    );
};

export default RouteMap;
