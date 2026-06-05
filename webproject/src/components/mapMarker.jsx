import L from 'leaflet';
import './mapMarker.css';

export const currentMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'current-marker',
    html: '<div class="current-dot"><div class="current-main-dot"></div></div>'
});

const hospitalMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'hospital-marker',
    html: '<div class="hospital-mark"></div>'
});

const pharmacyMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'pharmacy-marker',
    html: '<div class="pharmacy-mark"></div>'
});

const emergencyMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'emergency-marker',
    html: '<div class="emergency-mark"></div>'
});

const clinicMarker = L.divIcon({
    iconSize: [20, 20],
    className: 'clinic-marker',
    html: '<div class="clinic-mark"></div>'
})

export const markers = {
    hospital: hospitalMarker,
    pharmacy: pharmacyMarker,
    emergency: emergencyMarker,
    clinic: clinicMarker,
    public: hospitalMarker
};