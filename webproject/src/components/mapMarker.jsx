import L from 'leaflet';
import './mapMarker.css';

export const currentIcon = L.divIcon({
    iconSize: [20, 20],
    className: 'current-marker',
    html: '<div class="current-dot"><div class="current-main-dot"></div></div>'
});