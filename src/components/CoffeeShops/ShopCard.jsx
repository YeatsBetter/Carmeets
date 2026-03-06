import React from 'react';
import { Star, MapPin } from 'lucide-react';

const ShopCard = ({ shop, onNavigate }) => {
    return (
        <div style={{
            width: '280px',
            background: 'var(--bg-glass)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-glass)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-primary)'
        }}>
            {/* Image Header */}
            <div style={{ height: '140px', position: 'relative' }}>
                <img
                    src={shop.image}
                    alt={shop.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '12px', right: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-pill)',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '12px', fontWeight: 'bold'
                }}>
                    <Star size={14} color="#FBBF24" fill="#FBBF24" />
                    {shop.rating}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: 'white' }}>{shop.name}</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '12px', marginBottom: '12px' }}>
                    <MapPin size={12} />
                    <span>{shop.reviews} Yelp Reviews</span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '16px' }}>
                    {shop.description}
                </p>

                <button
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px 0', fontSize: '14px' }}
                    onClick={() => onNavigate && onNavigate(shop)}
                >
                    Navigate Here
                </button>
            </div>
        </div>
    );
};

export default ShopCard;
