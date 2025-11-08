import React from 'react';
import { Truck, Package, MapPin, Clock, AlertTriangle, Globe } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b-4 border-black bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-4">
            <Truck size={48} />
            <h1 className="text-5xl font-bold tracking-tight">Shipping Policy</h1>
          </div>
          <p className="text-xl text-gray-300">Last updated: October 31, 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="mb-12 p-8 border-2 border-black">
            <p className="text-lg leading-relaxed">
              At <strong>mrxycaps</strong>, we strive to deliver your favorite caps quickly and safely. This Shipping Policy provides detailed information about our shipping methods, delivery times, costs, and what you can expect when you place an order with us.
            </p>
          </div>

          {/* Processing Time */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Clock size={32} />
              <h2 className="text-3xl font-bold m-0">Order Processing Time</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">Standard Orders</h3>
                <p className="text-lg leading-relaxed">
                  Orders are typically processed within <strong>1-2 business days</strong> (Monday to Friday, excluding public holidays). You will receive an order confirmation email immediately after placing your order, followed by a shipping confirmation email with tracking details once your order has been dispatched.
                </p>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Customized Orders</h3>
                <p className="text-gray-700 leading-relaxed">
                  Custom embroidered or personalized caps require additional processing time of <strong>3-5 business days</strong> before shipping. We'll keep you updated on your order status via email.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Pre-Order Items</h3>
                <p className="text-gray-700 leading-relaxed">
                  Pre-order items will ship according to the estimated date mentioned on the product page. You'll receive a notification when your pre-order item is ready to ship.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Methods */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Package size={32} />
              <h2 className="text-3xl font-bold m-0">Shipping Methods & Delivery Time</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Standard Shipping (Free)</h3>
                <div className="bg-gray-50 border-2 border-black p-4 mb-3">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Delivery Time:</strong> 5-7 business days
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Cost:</strong> FREE on all orders above ₹999
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Applicable:</strong> Available across India
                  </p>
                </div>
                <p className="text-gray-700 text-sm">
                  Standard shipping is our default option and is free for orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 applies.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Express Shipping</h3>
                <div className="bg-gray-50 border-2 border-black p-4 mb-3">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Delivery Time:</strong> 2-4 business days
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Cost:</strong> ₹199 (flat rate)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Applicable:</strong> Major cities and metro areas
                  </p>
                </div>
                <p className="text-gray-700 text-sm">
                  Express shipping is available for customers who need their caps faster. Available in major cities including Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, and more.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Same-Day Delivery (Mumbai Only)</h3>
                <div className="bg-gray-50 border-2 border-black p-4 mb-3">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Delivery Time:</strong> Within 24 hours
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Cost:</strong> ₹299 (flat rate)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Applicable:</strong> Mumbai city limits only
                  </p>
                </div>
                <p className="text-gray-700 text-sm">
                  Orders placed before 12:00 PM on business days are eligible for same-day delivery within Mumbai. Orders placed after 12:00 PM will be delivered the next business day.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Costs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Shipping Costs</h2>
            
            <div className="bg-black text-white p-8 border-2 border-black mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-xl mb-3">Free Shipping</h3>
                  <p className="text-gray-300">On all orders above ₹999</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3">Orders Below ₹999</h3>
                  <p className="text-gray-300">Flat ₹99 shipping fee applies</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed">
                Shipping costs are calculated and displayed at checkout before you complete your purchase. The final shipping cost depends on your delivery location and chosen shipping method.
              </p>
            </div>
          </section>

          {/* Delivery Locations */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <MapPin size={32} />
              <h2 className="text-3xl font-bold m-0">Delivery Locations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6 bg-gray-50">
                <h3 className="font-bold text-xl mb-3">Domestic Shipping (India)</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We ship to all serviceable PIN codes across India. During checkout, you can verify if your location is serviceable by entering your PIN code.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Note:</strong> Delivery to remote or difficult-to-access areas may take additional 2-3 days beyond standard delivery times.
                </p>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">International Shipping</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Currently, we do not offer international shipping. We are working to expand our shipping services globally. Please check back for updates or contact us at <strong>support@mrxycaps.com</strong> for more information.
                </p>
              </div>

              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">Non-Serviceable Areas</h3>
                <p className="leading-relaxed">
                  We currently do not ship to P.O. Boxes, military addresses (APO/FPO), or certain remote locations. If your area is non-serviceable, you'll be notified during checkout.
                </p>
              </div>
            </div>
          </section>

          {/* Order Tracking */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Order Tracking</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Tracking Your Order</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once your order ships, you'll receive a shipping confirmation email with a tracking number and a link to track your package. You can also track your order by logging into your account on our website and viewing your order history.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Tracking Updates</h3>
                <p className="text-gray-700 mb-3">You'll receive updates via:</p>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Email notifications at key delivery milestones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>SMS updates (if you've opted in)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Real-time tracking on the courier's website</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Tracking Delays</h3>
                <p className="text-gray-700">
                  Please note that tracking information may take 24-48 hours to update after your order ships. If you don't see tracking updates after 48 hours, please contact our customer support team.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Partners */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Our Shipping Partners</h2>
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                We work with reliable and trusted courier partners to ensure your caps reach you safely:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border-2 border-black p-4 text-center font-bold">
                  Delhivery
                </div>
                <div className="border-2 border-black p-4 text-center font-bold">
                  Blue Dart
                </div>
                <div className="border-2 border-black p-4 text-center font-bold">
                  FedEx
                </div>
                <div className="border-2 border-black p-4 text-center font-bold">
                  DTDC
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-4">
                The courier partner is selected based on your location and chosen shipping method to ensure optimal delivery performance.
              </p>
            </div>
          </section>

          {/* Delivery Issues */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <AlertTriangle size={32} />
              <h2 className="text-3xl font-bold m-0">Delivery Issues</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Delayed Deliveries</h3>
                <p className="text-gray-700 leading-relaxed">
                  While we strive to meet delivery timelines, delays may occur due to unforeseen circumstances such as weather conditions, natural disasters, political unrest, or courier issues. We'll keep you informed of any significant delays.
                </p>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Failed Delivery Attempts</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  If the courier is unable to deliver your package, they will:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">1.</span>
                    <span>Make up to 3 delivery attempts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">2.</span>
                    <span>Leave a delivery notice with contact information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">3.</span>
                    <span>Hold the package at a local facility for pickup</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-3">
                  If all delivery attempts fail, the package will be returned to us, and you'll be contacted to arrange redelivery or a refund.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Incorrect Address</h3>
                <p className="text-gray-700 leading-relaxed">
                  Please ensure your shipping address is accurate and complete. We are not responsible for orders delivered to incorrect addresses provided by the customer. Address changes can only be made before the order ships. Contact us immediately if you need to update your address.
                </p>
              </div>

              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">Lost or Damaged Packages</h3>
                <p className="leading-relaxed mb-3">
                  If your package is lost in transit or arrives damaged:
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Contact us within 48 hours of delivery (for damaged items)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Provide photos of the damaged packaging and product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>We'll investigate with the courier and arrange a replacement or refund</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Multiple Items */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Multiple Items in One Order</h2>
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed mb-3">
                When you order multiple items:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>We try to ship all items together in one package to save on shipping costs and reduce environmental impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>If items are in different warehouses or have different processing times, they may ship separately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>You'll receive separate tracking numbers for each shipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>You will NOT be charged additional shipping fees for split shipments</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Holidays and Peak Seasons */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Holidays & Peak Seasons</h2>
            <div className="bg-gray-50 border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                During holidays and peak shopping seasons (Diwali, Christmas, New Year, etc.), please expect:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-black p-4">
                  <h3 className="font-bold mb-2">Extended Processing</h3>
                  <p className="text-sm text-gray-700">Order processing may take 2-4 business days instead of 1-2 days</p>
                </div>
                <div className="border-2 border-black p-4">
                  <h3 className="font-bold mb-2">Longer Delivery Times</h3>
                  <p className="text-sm text-gray-700">Delivery may take an additional 2-3 days due to high volume</p>
                </div>
              </div>
              <p className="text-gray-700 mt-4">
                We recommend placing orders early during peak seasons to ensure timely delivery. Holiday shipping cutoff dates will be announced on our website and social media channels.
              </p>
            </div>
          </section>

          {/* Packaging */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Packaging</h2>
            
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Your caps are carefully packaged to ensure they arrive in perfect condition:
              </p>
              <ul className="list-none space-y-2 ml-4 mb-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">✓</span>
                  <span>Caps are placed in protective plastic bags to prevent moisture damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">✓</span>
                  <span>Packed in sturdy, branded boxes with cushioning material</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">✓</span>
                  <span>Boxes are sealed with tamper-proof tape</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">✓</span>
                  <span>We use eco-friendly packaging materials wherever possible</span>
                </li>
              </ul>
              <p className="text-gray-700 text-sm">
                If your package arrives damaged, please refuse delivery or take photos and contact us immediately for assistance.
              </p>
            </div>
          </section>

          {/* Contact for Shipping */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Shipping Support</h2>
            <div className="bg-black text-white p-8 border-2 border-black">
              <p className="mb-6 text-lg">
                Have questions about shipping or need help tracking your order? Our team is here to assist!
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold">Email:</span>
                  <span>shipping@mrxycaps.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">Support Email:</span>
                  <span>support@mrxycaps.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">Phone:</span>
                  <span>+91-XXXX-XXXXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">Website:</span>
                  <span>www.mrxycaps.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold">Business Hours:</span>
                  <span>Monday - Saturday: 10:00 AM - 7:00 PM IST<br />Sunday: Closed</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t-4 border-black bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            This Shipping Policy is subject to change without notice. Please review it periodically for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;