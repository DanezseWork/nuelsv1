import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Crosshair, Search } from "lucide-react";

// Fix for Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: string, lat: number, lng: number) => void;
  initialAddress?: string;
}

export function MapModal({ isOpen, onClose, onSelect, initialAddress }: MapModalProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [marker, setMarker] = useState<L.Marker | null>(null);
  const [selectedAddress, setSelectedAddress] = useState(initialAddress || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Dialog open state
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure Dialog is rendered
      const timer = setTimeout(() => {
        setIsDialogOpen(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsDialogOpen(false);
    }
  }, [isOpen]);

  // Cleanup map when modal closes
  useEffect(() => {
    if (!isOpen && map) {
      console.log('Cleaning up map on modal close');
      map.remove();
      setMap(null);
      setMarker(null);
    }
  }, [isOpen, map]);

  // Initialize map when Dialog is open
  useEffect(() => {
    console.log('Map initialization effect triggered', { 
      isOpen, 
      isDialogOpen,
      hasMapRef: !!mapRef.current, 
      currentMap: !!map 
    });

    if (isDialogOpen && mapRef.current && !map) {
      console.log('Creating new map instance');
      
      const mapContainer = mapRef.current;
      const mapInstance = L.map(mapContainer, {
        center: [14.5995, 120.9842],
        zoom: 13,
        zoomControl: true,
        preferCanvas: true,
        renderer: L.canvas()
      });

      // Add tiles using OpenStreetMap directly
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 1
      }).addTo(mapInstance);

      // Add a draggable marker
      const markerInstance = L.marker([14.5995, 120.9842], {
        draggable: true
      }).addTo(mapInstance);

      // Handle marker drag
      markerInstance.on('dragend', () => {
        const position = markerInstance.getLatLng();
        getAddressFromCoordinates(position.lat, position.lng);
      });

      setMap(mapInstance);
      setMarker(markerInstance);

      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            mapInstance.setView([pos.lat, pos.lng], 15);
            markerInstance.setLatLng([pos.lat, pos.lng]);
            getAddressFromCoordinates(pos.lat, pos.lng);
          },
          () => {
            console.error('Error: The Geolocation service failed.');
          }
        );
      }

      // Force a resize event to ensure the map tiles are loaded
      setTimeout(() => {
        console.log('Invalidating map size');
        mapInstance.invalidateSize();
      }, 100);
    }

    return () => {
      console.log('Cleanup effect triggered');
    };
  }, [isDialogOpen]);

  // Handle map resize when modal opens/closes
  useEffect(() => {
    if (map) {
      console.log('Setting up resize handler');
      const handleResize = () => {
        console.log('Resizing map');
        map.invalidateSize();
      };

      // Initial resize
      handleResize();

      // Add resize listener
      window.addEventListener('resize', handleResize);

      return () => {
        console.log('Removing resize handler');
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [map]);

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      setSelectedAddress(data.display_name);
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!map) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.length > 0) {
        const result = data[0];
        map.setView([parseFloat(result.lat), parseFloat(result.lon)], 15);
        if (marker) {
          marker.setLatLng([parseFloat(result.lat), parseFloat(result.lon)]);
        }
        setSelectedAddress(result.display_name);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        setSearchResults(data);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error getting search suggestions:', error);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (result: SearchResult) => {
    setSearchQuery(result.display_name);
    setShowDropdown(false);
    handleSearch(result.display_name);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation || !map || !marker) return;

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setView([pos.lat, pos.lng], 15);
        marker.setLatLng([pos.lat, pos.lng]);
        getAddressFromCoordinates(pos.lat, pos.lng);
        setIsLoading(false);
      },
      () => {
        console.error('Error: The Geolocation service failed.');
        setIsLoading(false);
      }
    );
  };

  const handleSelect = () => {
    if (marker && map) {
      const position = marker.getLatLng();
      onSelect(selectedAddress, position.lat, position.lng);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
          <DialogDescription>
            Search for a location or drag the marker to set the exact position
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2 relative">
            <div className="flex-1 relative">
              <Input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchInput}
                placeholder="Search for a location"
                className="w-full"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                    setShowDropdown(false);
                  }
                }}
              />
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(result)}
                    >
                      {result.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button onClick={() => handleSearch(searchQuery)} disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button onClick={handleCurrentLocation} disabled={isLoading}>
              <Crosshair className="h-4 w-4 mr-2" />
              Current
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {isLoading ? "Loading..." : "Drag the marker to set location"}
              </span>
            </div>
            <div 
              ref={mapRef}
              className="map-container"
              style={{ 
                height: '500px',
                width: '100%',
                position: 'relative',
                zIndex: 1000,
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc'
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex-1 mr-4">
              <Input
                value={selectedAddress}
                readOnly
                placeholder="Selected address will appear here"
              />
            </div>
            <Button onClick={handleSelect}>Select Location</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 