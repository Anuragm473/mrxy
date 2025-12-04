"use client";
import React, { useState,useEffect } from 'react';
import { User, Package, MapPin, Heart, Edit2, Save, X, ShoppingBag, TrendingUp, Mail, Phone, Home } from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [recommendedProducts,setRecommendedProducts]=useState([]);
  const [recentOrders,setRecentOrders]=useState([])
  
  // Mock user data - replace with actual API call
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    addresses: [
      {
        apartment: 'A-101, Green Park',
        street: 'MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      }
    ]
  });

  const [editedData, setEditedData] = useState({ ...userData });

  // Mock stats
  const stats = {
    totalOrders: 12,
    activeOrders: 2,
    completed: 10,
    totalSpent: 8499
  };

  useEffect(()=>{
    async function fetchUserData(){
        const token=localStorage.getItem('token');
        const response=await fetch('/api/users/profile',{
            headers:{
                authorization:`Bearer ${token}`,
                accept:'application/json'
            }
        })
        const data=await response.json()
        setUserData(data.user)
        setRecommendedProducts(data.suggestedProducts.user)
        setRecentOrders(data.orders.user)
    }
    fetchUserData()
  },[])


  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...editedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field:any, value:any) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (index:any, field:any, value:any) => {
    const newAddresses = [...editedData.addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setEditedData(prev => ({ ...prev, addresses: newAddresses }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-3xl font-bold">
                {userData.firstName[0]}{userData.lastName[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{userData.firstName} {userData.lastName}</h1>
                <p className="text-gray-600 mt-1">{userData.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button 
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            )}
            {isEditing && (
              <div className="flex gap-2">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <Save size={18} />
                  Save
                </button>
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-black hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center border-r border-gray-700 last:border-r-0">
              <div className="flex justify-center mb-2">
                <Package size={32} />
              </div>
              <div className="text-4xl font-bold mb-1">{stats.totalOrders}</div>
              <div className="text-sm text-gray-300">Total Orders</div>
            </div>
            <div className="text-center border-r border-gray-700 last:border-r-0">
              <div className="flex justify-center mb-2">
                <TrendingUp size={32} />
              </div>
              <div className="text-4xl font-bold mb-1">{stats.activeOrders}</div>
              <div className="text-sm text-gray-300">Active Orders</div>
            </div>
            <div className="text-center border-r border-gray-700 last:border-r-0">
              <div className="flex justify-center mb-2">
                <ShoppingBag size={32} />
              </div>
              <div className="text-4xl font-bold mb-1">{stats.completed}</div>
              <div className="text-sm text-gray-300">Completed</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Heart size={32} />
              </div>
              <div className="text-4xl font-bold mb-1">₹{stats.totalSpent}</div>
              <div className="text-sm text-gray-300">Total Spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            {['overview', 'orders', 'addresses'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 text-sm font-medium uppercase tracking-wider transition-colors relative ${
                  activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-8">
            {/* Personal Information */}
            <div className="col-span-2 space-y-8">
              <div className="border-2 border-black p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <User size={24} />
                  Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 border border-gray-300">{userData.firstName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 border border-gray-300">{userData.lastName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Email</label>
                    <div className="px-4 py-3 bg-gray-100 border border-gray-300 text-gray-500">{userData.email}</div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 border border-gray-300">{userData.phone}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="border-2 border-black p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Package size={24} />
                  Recent Orders
                </h2>
                <div className="space-y-3">
                  {recentOrders?.length>0 && recentOrders?.map((order:any) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-black hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="font-bold text-lg">{order.id}</div>
                        <div className="text-sm text-gray-600">{order.date} • {order.items.length()} items</div>
                      </div>
                      <div className="text-right mr-6">
                        <div className="font-bold text-lg">₹{order.total}</div>
                        <div className={`text-sm font-medium ${
                          order.status === 'Delivered' ? 'text-black' : 
                          order.status === 'Shipped' ? 'text-gray-700' : 'text-gray-500'
                        }`}>{order.status}</div>
                      </div>
                      <button className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full py-3 border-2 border-white hover:bg-white hover:text-black transition-colors text-left px-4">
                    Track Orders
                  </button>
                  <button className="w-full py-3 border-2 border-white hover:bg-white hover:text-black transition-colors text-left px-4">
                    View Wishlist
                  </button>
                  <button className="w-full py-3 border-2 border-white hover:bg-white hover:text-black transition-colors text-left px-4">
                    Change Password
                  </button>
                </div>
              </div>

              {/* Account Summary */}
              <div className="border-2 border-black p-6">
                <h3 className="text-xl font-bold mb-4">Account Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">Jan 2024</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600">Account Status</span>
                    <span className="font-medium">Active</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Loyalty Points</span>
                    <span className="font-medium">850</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="border-2 border-black p-8">
            <h2 className="text-3xl font-bold mb-8">Order History</h2>
            <div className="space-y-4">
              {recentOrders.map((order:any) => (
                <div key={order.id} className="border-2 border-black p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">{order.id}</div>
                      <div className="text-gray-600 mt-1">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₹{order.total}</div>
                      <div className="text-sm mt-1 font-medium">{order.status}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-gray-300">
                    <button className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors">
                      View Details
                    </button>
                    <button className="px-6 py-2 border-2 border-black hover:bg-gray-100 transition-colors">
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="border-2 border-black p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <MapPin size={32} />
                Saved Addresses
              </h2>
              <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
                Add New Address
              </button>
            </div>
            <div className="space-y-4">
              {(isEditing ? editedData : userData).addresses.map((address, index) => (
                <div key={index} className="border-2 border-black p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Apartment</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.addresses[index].apartment}
                          onChange={(e) => handleAddressChange(index, 'apartment', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 border border-gray-300">{address.apartment}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Street</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.addresses[index].street}
                          onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 border border-gray-300">{address.street}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 uppercase tracking-wide">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.addresses[index].city}
                          onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 border border-gray-300">{address.city}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 uppercase tracking-wide">State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.addresses[index].state}
                          onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 border border-gray-300">{address.state}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Pincode</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.addresses[index].pincode}
                          onChange={(e) => handleAddressChange(index, 'pincode', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 border border-gray-300">{address.pincode}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Country</label>
                      <div className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-500">{address.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Products */}
        <div className="mt-12 border-t-2 border-black pt-12">
          <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-4 gap-6">
            {recommendedProducts?.map((product:any) => (
              <div key={product.id} className="border-2 border-black group hover:bg-black hover:text-white transition-all">
                <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl border-b-2 border-black group-hover:border-white">
                  {product.image}
                </div>
                <div className="p-4">
                  <div className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-gray-300 mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">₹{product.price}</span>
                    <button className="px-4 py-2 border-2 border-black bg-white text-black group-hover:border-white group-hover:bg-black group-hover:text-white hover:bg-gray-100 transition-colors text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;