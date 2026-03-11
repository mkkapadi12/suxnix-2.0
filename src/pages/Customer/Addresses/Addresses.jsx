import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getAddresses } from '@/Store/features/address/address.slice';
import CommonHero from '@/pages/components/CommonHero';
import AddressCard from './components/AddressCard';
import AddressForm from './components/AddressForm';

const Addresses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const { addresses, loading } = useSelector((state) => state.address);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch addresses
    dispatch(getAddresses());
  }, [token, dispatch, navigate]);

  const handleAddNew = () => {
    setSelectedAddress(null);
    setFormOpen(true);
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedAddress(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <CommonHero title="My Addresses" />

      <section className="py-12 lg:py-16">
        <div className="max-w-330 mx-auto px-4 container">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#222222' }}
            >
              Saved Addresses
            </h2>
            <Button
              onClick={handleAddNew}
              className="bg-suxnix-primary hover:bg-amber-500 text-gray-900"
            >
              + Add New Address
            </Button>
          </div>

          {/* Addresses Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-lg text-gray-600">Loading addresses...</p>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <p className="text-lg text-gray-600 mb-6">
                No addresses saved yet.
              </p>
              <Button
                onClick={handleAddNew}
                className="bg-suxnix-primary hover:bg-amber-500 text-gray-900"
              >
                Add Your First Address
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Address Form Dialog */}
      <AddressForm
        open={formOpen}
        onOpenChange={handleFormClose}
        address={selectedAddress}
      />
    </main>
  );
};

export default Addresses;
