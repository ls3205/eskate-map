import L from 'leaflet'

export const defaultIcon = L.icon({
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
    popupAnchor: [0.5, -32.5],
    iconAnchor: [12.5, 35],
});