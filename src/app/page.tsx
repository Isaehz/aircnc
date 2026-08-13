'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_LISTINGS } from '../data/mockListings';
import { Listing, ListingCategory } from '../types/listing';
import { MainLayout } from '../components/templates/MainLayout';
import { FloatingSearchBar } from '../components/organisms/FloatingSearchBar';
import { CategoryBar } from '../components/organisms/CategoryBar';
import { ListingGrid } from '../components/organisms/ListingGrid';
import { MapView } from '../components/organisms/MapView';
import { ListingDetailModal } from '../components/organisms/ListingDetailModal';
import { BookingModal } from '../components/organisms/BookingModal';

export default function HomePage() {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory>('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState(1);
  const [showTaxes, setShowTaxes] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Modal States
  const [detailListing, setDetailListing] = useState<Listing | null>(null);
  const [bookingInfo, setBookingInfo] = useState<{
    isOpen: boolean;
    listing: Listing | null;
    nights: number;
    totalPrice: number;
  }>({
    isOpen: false,
    listing: null,
    nights: 3,
    totalPrice: 0,
  });

  // Filter listings calculation
  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Location search match
      if (searchLocation.trim() !== '') {
        const query = searchLocation.toLowerCase();
        const locMatch =
          item.location.city.toLowerCase().includes(query) ||
          item.location.state.toLowerCase().includes(query) ||
          item.location.country.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query);
        if (!locMatch) return false;
      }
      // Guest capacity match
      if (item.maxGuests < guests) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, searchLocation, guests]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchLocation('');
    setCheckIn('');
    setGuests(1);
  };

  const handleConfirmReservation = (listing: Listing, nights: number, total: number) => {
    setDetailListing(null);
    setBookingInfo({
      isOpen: true,
      listing,
      nights,
      totalPrice: total,
    });
  };

  return (
    <MainLayout onOpenFavorites={() => alert('Favoritos guardados localmente')}>
      {/* Sticky Header Container for Search Bar & Categories */}
      <div className="sticky top-20 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <FloatingSearchBar
          location={searchLocation}
          onLocationChange={setSearchLocation}
          checkIn={checkIn}
          onCheckInChange={setCheckIn}
          guests={guests}
          onGuestsChange={setGuests}
          onSearch={() => {}}
        />

        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          showTaxes={showTaxes}
          onToggleTaxes={setShowTaxes}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {viewMode === 'grid' ? (
          <ListingGrid
            listings={filteredListings}
            showTaxes={showTaxes}
            onSelectListing={(listing) => setDetailListing(listing)}
            onResetFilters={handleResetFilters}
          />
        ) : (
          <MapView
            listings={filteredListings}
            showTaxes={showTaxes}
            onSelectListing={(listing) => setDetailListing(listing)}
          />
        )}
      </div>

      {/* Detail Quick View Modal */}
      <ListingDetailModal
        listing={detailListing}
        onClose={() => setDetailListing(null)}
        onConfirmReservation={handleConfirmReservation}
      />

      {/* Booking Confirmation Checkout Modal */}
      <BookingModal
        isOpen={bookingInfo.isOpen}
        listing={bookingInfo.listing}
        nights={bookingInfo.nights}
        totalPrice={bookingInfo.totalPrice}
        onClose={() => setBookingInfo((prev) => ({ ...prev, isOpen: false }))}
      />
    </MainLayout>
  );
}
