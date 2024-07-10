/* eslint-disable @next/next/no-img-element */
// components/MapComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [imageSrc, setImageSrc] = useState<string>('');
    const [locationInfo, setLocationInfo] = useState<{ centerLat: number; centerLng: number; zoom: number } | null>(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: 'AIzaSyCpzV2uci8gLyp8si2idL0Gy1PLUe_J8bU', // Replace with your Google Maps API key
            version: 'weekly',
            libraries: ['drawing'],
        });

        loader.load().then((google) => {
            if (!mapRef.current) {
                console.error('Map element not found');
                return;
            }

            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 28.690236, lng: 77.288749 }, // Default center (Bhopal)
                zoom: 12, // Default zoom level
            });

            let currentRectangle: google.maps.Rectangle | null = null;

            const drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.RECTANGLE],
                },
            });

            drawingManager.setMap(map);

            google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event: any) {
                if (currentRectangle) {
                    currentRectangle.setMap(null); // Remove the previous rectangle
                }
                currentRectangle = event.overlay as google.maps.Rectangle;

                const bounds = currentRectangle.getBounds();
                if (!bounds) return;

                console.log('Captured Bounds:', bounds);

                const proxyUrl = 'https://gmap-sih-img-proxy.vipulchaturvedi.workers.dev/'; // Replace with your Cloudflare Workers URL

                const imgSrc = `${proxyUrl}?center=${bounds.getCenter().lat()},${bounds.getCenter().lng()}&zoom=15&size=640x640&path=fillcolor:transparent|${bounds.getNorthEast().toUrlValue()}|${bounds.getNorthEast().lat()},${bounds.getSouthWest().lng()}|${bounds.getSouthWest().toUrlValue()}|${bounds.getSouthWest().lat()},${bounds.getNorthEast().lng()}&key=AIzaSyCpzV2uci8gLyp8si2idL0Gy1PLUe_J8bU`;

                setImageSrc(imgSrc);

                setLocationInfo({
                    centerLat: bounds.getCenter().lat(),
                    centerLng: bounds.getCenter().lng(),
                    zoom: 15,
                });
            });
        }).catch(e => {
            console.error('Error loading Google Maps API:', e);
        });
    }, []);

    return (
        <div className="flex flex-col items-center p-10 bg-gray-100 w-full min-h-screen">
            <h1 className="text-center font-semibold text-3xl mb-8">Draw Your Map Boundary</h1>
            <div ref={mapRef} className="h-[500px] w-full max-w-[800px] border-2 border-gray-300 rounded-md"></div>
            <div className="mt-5 p-5 bg-white border-2 border-gray-300 rounded-md shadow-md w-full max-w-[800px]">
                <h2 className="text-center font-bold text-2xl">Cropped Image</h2>
                {imageSrc && <img src={imageSrc} alt="Cropped Image" className="max-w-full h-auto mt-2 justify-center items-center" crossOrigin="anonymous" />}
                {locationInfo && (
                    <div className="mt-5 text-center">
                        <p className="text-xl font-semibold">Center Latitude: {locationInfo.centerLat}</p>
                        <p className="text-xl font-semibold">Center Longitude: {locationInfo.centerLng}</p>
                        <p className="text-xl font-semibold">Zoom Level: {locationInfo.zoom}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapComponent;
