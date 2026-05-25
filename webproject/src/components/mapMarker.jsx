import L from 'leaflet';
import './mapMarker.css';

export const currentMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'current-marker',
    html: '<div class="current-dot"><div class="current-main-dot"></div></div>'
});

export const hospitalMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'hospital-marker',
    html: '<div class="hospital-mark"></div>'
});

export const pharmacyMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'pharmacy-marker',
    html: '<div class="pharmacy-mark"></div>'
});

export const emergencyMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'emergency-marker',
    html: '<div class="emergency-mark"></div>'
});

export const clinicMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'clinic-marker',
    html: '<div class="clinic-mark"></div>'
})
export const markers={};