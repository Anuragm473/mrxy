"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Tab = "dashboard" | "products" | "orders";

interface User {
  role: "admin" | "user";
  name: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  category: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  details: string;
  careInstructions: string[];
}

interface Order {
  _id: string;
  user?: { name: string; email: string };
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
  shippingAddress: {
    city: string;
    pincode: string;
  };
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    color: "",
    category: "Basic",
    price: 0,
    discountedPrice: 0,
    details: "",
    careInstructions: "",
  });

  // Image upload states
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Get auth token
  const getAuthToken = () => {
    const token = window.localStorage.getItem("token");
    return token ? token : null;
  };

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "admin") {
      alert("Access denied. Admin only.");
      router.push("/");
      return;
    }

    setUser(parsedUser);
    fetchDashboardData();
    setLoading(false);
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const token = getAuthToken();
      
      const prodRes = await fetch("/api/products");
      const prodData = await prodRes.json();
      setProducts(Array.isArray(prodData) ? prodData : []);

      const ordRes = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const ordData = await ordRes.json();
      setOrders(Array.isArray(ordData) ? ordData : []);

      const revenue = (Array.isArray(ordData) ? ordData : []).reduce(
        (sum: number, o: Order) =>
          o.status === "paid" || o.status === "delivered"
            ? sum + o.totalAmount
            : sum,
        0
      );
      const pending = (Array.isArray(ordData) ? ordData : []).filter(
        (o: Order) => o.status === "created" || o.status === "processing"
      ).length;

      setStats({
        totalRevenue: revenue,
        totalOrders: Array.isArray(ordData) ? ordData.length : 0,
        totalProducts: Array.isArray(prodData) ? prodData.length : 0,
        pendingOrders: pending,
      });
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  // Handle file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 5 images
    const newFiles = files.slice(0, 5 - imageFiles.length);
    setImageFiles([...imageFiles, ...newFiles]);

    // Create previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image from upload list
  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  // Remove existing image (for edit)
  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      
      if (!token) {
        alert("Authentication required. Please login again.");
        router.push("/login");
        return;
      }

      // Convert all image files to base64
      const base64Images = await Promise.all(
        imageFiles.map((file) => fileToBase64(file))
      );

      const payload = {
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        color: productForm.color.trim(),
        category: productForm.category,
        price: Number(productForm.price),
        discountedPrice: productForm.discountedPrice ? Number(productForm.discountedPrice) : undefined,
        images: base64Images,
        details: productForm.details.trim(),
        careInstructions: productForm.careInstructions
          .split(",")
          .map(s => s.trim())
          .filter(Boolean),
      };

      if (!payload.name || !payload.description || !payload.color || !payload.price) {
        alert("Please fill all required fields");
        setIsSubmitting(false);
        return;
      }

      if (payload.images.length === 0) {
        alert("Please upload at least one image");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      alert("Product created successfully!");
      setShowProductModal(false);
      resetProductForm();
      fetchDashboardData();
    } catch (err: any) {
      console.error("Error creating product:", err);
      alert(err.message || "Error creating product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      
      if (!token) {
        alert("Authentication required. Please login again.");
        router.push("/login");
        return;
      }

      // Convert new image files to base64
      const base64Images = await Promise.all(
        imageFiles.map((file) => fileToBase64(file))
      );

      // Combine existing images with new ones
      const allImages = [...existingImages, ...base64Images];

      const payload = {
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        color: productForm.color.trim(),
        category: productForm.category,
        price: Number(productForm.price),
        discountedPrice: productForm.discountedPrice ? Number(productForm.discountedPrice) : undefined,
        images: allImages,
        details: productForm.details.trim(),
        careInstructions: productForm.careInstructions
          .split(",")
          .map(s => s.trim())
          .filter(Boolean),
      };

      const res = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      alert("Product updated successfully!");
      setShowProductModal(false);
      setEditingProduct(null);
      resetProductForm();
      fetchDashboardData();
    } catch (err: any) {
      console.error("Error updating product:", err);
      alert(err.message || "Error updating product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = getAuthToken();
      
      if (!token) {
        alert("Authentication required. Please login again.");
        router.push("/login");
        return;
      }

      const res = await fetch(`/api/products/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      

      alert("Product deleted successfully!");
      fetchDashboardData();
    } catch (err: any) {
      console.error("Error deleting product:", err);
      alert(err.message || "Error deleting product");
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      color: product.color,
      category: product.category,
      price: product.price,
      discountedPrice: product.discountedPrice || 0,
      details: product.details,
      careInstructions: product.careInstructions.join(", "),
    });
    setExistingImages(product.images);
    setImageFiles([]);
    setImagePreviews([]);
    setShowProductModal(true);
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      color: "",
      category: "Basic",
      price: 0,
      discountedPrice: 0,
      details: "",
      careInstructions: "",
    });
    setImageFiles([]);
    setImagePreviews([]);
    setExistingImages([]);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        alert("Authentication required. Please login again.");
        router.push("/login");
        return;
      }

      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update order");
      }

      alert("Order status updated!");
      fetchDashboardData();
      setShowOrderDetail(null);
    } catch (err: any) {
      console.error("Error updating order:", err);
      alert(err.message || "Error updating order");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">ADMIN PANEL</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">{user?.name}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex gap-1 mb-8 border-b border-gray-200">
          {(["dashboard", "products", "orders"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} />
              <StatCard title="Total Orders" value={stats.totalOrders.toString()} />
              <StatCard title="Total Products" value={stats.totalProducts.toString()} />
              <StatCard title="Pending Orders" value={stats.pendingOrders.toString()} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <div className="font-medium">₹{order.totalAmount}</div>
                        <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                      <span className={`px-2 py-1 text-xs ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">Products Overview</h3>
                <div className="space-y-3">
                  {products.slice(0, 5).map((product) => (
                    <div key={product._id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="font-medium truncate">{product.name}</div>
                      <div className="text-sm">₹{product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Products</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  resetProductForm();
                  setShowProductModal(true);
                }}
                className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                + New Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="border border-gray-200 p-4 hover:border-black transition-colors">
                  {product.images[0] && (
                    <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4" />
                  )}
                  <h3 className="font-bold mb-2 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">₹{product.price}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1">{product.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex-1 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex-1 py-2 bg-white text-black border border-black text-sm hover:bg-gray-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Orders</h2>
            <div className="border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono">{order._id.slice(-8)}</td>
                      <td className="px-4 py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm">{order.user?.name || "Guest"}</td>
                      <td className="px-4 py-3 text-sm font-bold">₹{order.totalAmount}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs ${getStatusColor(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setShowOrderDetail(order)}
                          className="text-sm underline hover:no-underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showProductModal && (
        <Modal onClose={() => { setShowProductModal(false); setEditingProduct(null); }}>
          <h3 className="text-2xl font-bold mb-6">{editingProduct ? "Edit Product" : "Create Product"}</h3>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="space-y-4">
            <input
              type="text"
              placeholder="Product Name *"
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              required
              disabled={isSubmitting}
            />
            <textarea
              placeholder="Description *"
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
              rows={3}
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              required
              disabled={isSubmitting}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Color *"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                value={productForm.color}
                onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                required
                disabled={isSubmitting}
              />
              <select
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                required
                disabled={isSubmitting}
              >
                <option>Basic</option>
                <option>Baseball</option>
                <option>Snapback</option>
                <option>Trucker</option>
                <option>Fitted Cap</option>
                <option>Exclusive Collection</option>
                <option>Alpha Gen Kids</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price *"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                value={productForm.price || ""}
                onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                required
                disabled={isSubmitting}
                min="0"
              />
              <input
                type="number"
                placeholder="Discounted Price (optional)"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                value={productForm.discountedPrice || ""}
                onChange={(e) => setProductForm({ ...productForm, discountedPrice: Number(e.target.value) })}
                disabled={isSubmitting}
                min="0"
              />
            </div>

            {/* Image Upload Section */}
            <div className="border-2 border-dashed border-gray-300 p-4">
              <label className="block text-sm font-medium mb-2">Product Images (Max 5)</label>
              
              {/* Existing Images (for edit mode) */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Existing Images:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {existingImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Existing ${idx}`} className="w-full h-24 object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={isSubmitting}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">New Images:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {imagePreviews.map((preview, idx) => (
                      <div key={idx} className="relative group">
                        <img src={preview} alt={`Preview ${idx}`} className="w-full h-24 object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={isSubmitting}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Input */}
              {(imageFiles.length + existingImages.length) < 5 && (
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="w-full text-sm"
                  disabled={isSubmitting}
                />
              )}
              <p className="text-xs text-gray-500 mt-2">
                {imageFiles.length + existingImages.length}/5 images selected
              </p>
            </div>

            <textarea
              placeholder="Details"
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
              rows={2}
              value={productForm.details}
              onChange={(e) => setProductForm({ ...productForm, details: e.target.value })}
              disabled={isSubmitting}
            />
            <input
              type="text"
              placeholder="Care Instructions (comma separated)"
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
              value={productForm.careInstructions}
              onChange={(e) => setProductForm({ ...productForm, careInstructions: e.target.value })}
              disabled={isSubmitting}
            />
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : editingProduct ? "Update Product" : "Create Product"}
              </button>
              <button
                type="button"
                onClick={() => { setShowProductModal(false); setEditingProduct(null); }}
                className="flex-1 py-3 bg-white text-black border border-black hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showOrderDetail && (
        <Modal onClose={() => setShowOrderDetail(null)}>
          <h3 className="text-2xl font-bold mb-6">Order Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Order ID</div>
                <div className="font-mono">{showOrderDetail._id}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Date</div>
                <div>{new Date(showOrderDetail.createdAt).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Customer</div>
                <div>{showOrderDetail.user?.name || "Guest"}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Total Amount</div>
                <div className="font-bold">₹{showOrderDetail.totalAmount}</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="text-gray-500 mb-2">Items</div>
              {showOrderDetail.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium">₹{item.unitPrice * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="text-gray-500 mb-2">Shipping Address</div>
              <div className="text-sm">
                {showOrderDetail.shippingAddress.city}, {showOrderDetail.shippingAddress.pincode}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="text-gray-500 mb-2">Update Status</div>
              <select
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black mb-4"
                value={showOrderDetail.status}
                onChange={(e) => handleUpdateOrderStatus(showOrderDetail._id, e.target.value)}
              >
                <option value="created">Created</option>
                <option value="paid">Paid</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <button
              onClick={() => setShowOrderDetail(null)}
              className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Helper Components
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border border-gray-200 p-6 hover:border-black transition-colors">
      <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    created: "bg-gray-200 text-gray-800",
    paid: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-200 text-green-900",
    cancelled: "bg-red-100 text-red-800",
    failed: "bg-red-200 text-red-900",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}