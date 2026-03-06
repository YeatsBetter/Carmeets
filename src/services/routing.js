// Uses Open Source Routing Machine (OSRM) free demo server for drawing real routes
// Note: In production with Mapbox, we'd use Mapbox Directions API, which better supports avoiding highways ("exclude=toll,motorway")

export const fetchRoute = async (startLatLng, endLatLng) => {
    const [startLat, startLng] = startLatLng;
    const [endLat, endLng] = endLatLng;

    // OSRM requires format: lon,lat;lon,lat
    // We use profile "driving" or "car" (OSRM demo uses 'driving')
    // Added avoid=toll,motorway to prioritize backroads (though OSRM public demo support for this parameter varies, 
    // it's the correct syntax for many routing engines based on it)
    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&exclude=toll,motorway`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
            // GeoJSON coordinates are [longitude, latitude]
            const coords = data.routes[0].geometry.coordinates;
            // Leaflet Polyline expects [latitude, longitude]
            return coords.map(c => [c[1], c[0]]);
        }
        return null;
    } catch (error) {
        console.error("Error fetching route from OSRM", error);
        return null;
    }
};
