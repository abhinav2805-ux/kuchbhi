// components/MapComponent.js
import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = () => {
    useEffect(() => {
        const loader = new Loader({
            apiKey: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCpzV2uci8gLyp8si2idL0Gy1PLUe_J8bU&libraries=drawing&callback=initMap', // Replace with your Google Maps API key
            version: 'weekly',
            libraries: ['drawing'],
        });

        loader.load().then((google) => {
          const mapElement = document.getElementById('map');
          if (!mapElement) {
              console.error('Map element not found');
              return;
          }

          const map = new google.maps.Map(mapElement as HTMLElement, {
              center: { lat: 23.2599, lng: 77.4126 }, // Default center (Bhopal)
              zoom: 12, // Default zoom level
          });


            let currentRectangle:any = null; // To keep track of the current rectangle

            const drawingManager = new google.maps.drawing.DrawingManager({
              drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
              drawingControl: true,
              drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [google.maps.drawing.OverlayType.RECTANGLE],
              },
          });
            drawingManager.setMap(map);

            google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event:any) {
                if (currentRectangle) {
                    currentRectangle.setMap(null); // Remove the previous rectangle
                }
                currentRectangle = event.overlay;

                const bounds = currentRectangle.getBounds();
                console.log('Captured Bounds:', bounds);

                const proxyUrl = 'https://gmap-sih-img-proxy.vipulchaturvedi.workers.dev/'; // Replace with your Cloudflare Workers URL

                const img = new Image();
                img.src = `${proxyUrl}?center=${bounds.getCenter().lat()},${bounds.getCenter().lng()}&zoom=15&size=640x640&path=fillcolor:transparent|${bounds.getNorthEast().toUrlValue()}|${bounds.getNorthEast().lat()},${bounds.getSouthWest().lng()}|${bounds.getSouthWest().toUrlValue()}|${bounds.getSouthWest().lat()},${bounds.getNorthEast().lng()}&key=YOUR_GOOGLE_MAPS_API_KEY`;

                const croppedImage = document.getElementById('croppedImage') as HTMLImageElement;
if (croppedImage) {
    croppedImage.src = img.src;
}


                const locationInfo = {
                    centerLat: bounds.getCenter().lat(),
                    centerLng: bounds.getCenter().lng(),
                    zoom: 15,
                };

                const locationInfoDiv = document.getElementById('locationInfo');
                if (locationInfoDiv) {
                  locationInfoDiv.innerHTML = `<p>Center Latitude: ${locationInfo.centerLat}</p><p>Center Longitude: ${locationInfo.centerLng}</p><p>Zoom Level: ${locationInfo.zoom}</p>`;
              }
            });
        }).catch(e => {
            console.error('Error loading Google Maps API:', e);
        });
    }, []);

    return (
        <div>
            <h1>Draw Your Map Boundary</h1>
            <div id="map" style={{ height: '400px', width: '80%', margin: '0 auto', border: '2px solid #ddd', borderRadius: '5px' }}></div>
            <div id="output" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', border: '2px solid #ddd', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2>Cropped Image</h2>
                <img id="croppedImage" src="" alt="Cropped Image" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} crossOrigin="anonymous" />
                <div id="locationInfo" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ margin: '5px 0', fontSize: '16px' }}></p>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
