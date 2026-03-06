// Mock data generator for East Coast Coffee Shops
// Centered roughly around 40.7128, -74.0060 (NY Area) to 41.5 (Hudson Valley), etc.

const mockCoffeeShops = [
    {
        id: 1,
        name: "Bear Mountain Roasters",
        rating: 4.8,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400",
        lat: 41.3121,
        lng: -74.0064,
        description: "Cozy spot perfect for a mid-drive break before tackling Seven Lakes Drive.",
    },
    {
        id: 2,
        name: "Valley Brew",
        rating: 4.5,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400",
        lat: 41.4988,
        lng: -73.9877,
        description: "Rustic cafe overlooking the river. Excellent pour-overs.",
    },
    {
        id: 3,
        name: "Scenic Sip",
        rating: 4.9,
        reviews: 512,
        image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=400",
        lat: 40.8521,
        lng: -74.2064,
        description: "Artisan coffee nestled in the woods. Great parking for cars.",
    },
    {
        id: 4,
        name: "The Twisted Bean",
        rating: 4.6,
        reviews: 120,
        image: "https://images.unsplash.com/photo-1521185496955-15097b20c5fe?auto=format&fit=crop&q=80&w=400",
        lat: 41.1522,
        lng: -74.3321,
        description: "Located right off the famous winding backroad 9W.",
    },
    {
        id: 5,
        name: "Highland Coffee House",
        rating: 4.7,
        reviews: 231,
        image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=400",
        lat: 41.7144,
        lng: -73.9680,
        description: "Perfect destination for a Sunday morning drive.",
    }
];

export const fetchLocalCoffeeShops = async (centerLat, centerLng, radiusMiles = 50) => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCoffeeShops);
        }, 600);
    });
};
