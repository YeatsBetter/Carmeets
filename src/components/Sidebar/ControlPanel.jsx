import React, { useState } from 'react';
import { Settings, Map, Coffee } from 'lucide-react';

const ControlPanel = () => {
    const [routeLength, setRouteLength] = useState(50);

    return (
        <div className="glass-panel" style={{ width: '380px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
                <h1 className="text-gradient" style={{ fontSize: '28px', marginBottom: '4px', fontWeight: '700' }}>
                    Backroads
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    East Coast Coffee & Curves
                </p>
            </div>

            <div style={{ height: '1px', background: 'var(--border-light)', margin: '4px 0' }} />

            {/* Length Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Map size={16} color="var(--accent-secondary)" /> Route Length
                    </label>
                    <span style={{ fontSize: '14px', color: 'var(--accent-primary)', fontWeight: '600' }}>{routeLength} miles</span>
                </div>
                <input
                    type="range"
                    min="10"
                    max="200"
                    value={routeLength}
                    onChange={(e) => setRouteLength(e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    <span>10m</span>
                    <span>200m</span>
                </div>
            </div>

            {/* Action Button */}
            <button className="btn-primary" style={{ marginTop: '12px' }}>
                <Coffee size={18} /> Find Coffee & Curves
            </button>

        </div>
    );
};

export default ControlPanel;
