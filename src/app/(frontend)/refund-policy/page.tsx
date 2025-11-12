import React from 'react';
import { RotateCcw, Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b-4 border-black bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-4">
            <RotateCcw size={48} />
            <h1 className="text-5xl font-bold tracking-tight">Refund & Return Policy</h1>
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
              At <strong>mrxycaps</strong>, we want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help. This Refund & Return Policy outlines the conditions and procedures for returns, exchanges, and refunds.
            </p>
          </div>

          {/* Return Period */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Clock size={32} />
              <h2 className="text-3xl font-bold m-0">Return Period</h2>
            </div>
            
            <div className="bg-black text-white p-8 border-2 border-black">
              <p className="text-2xl font-bold mb-4">7-Day Return Window</p>
              <p className="leading-relaxed text-lg">
                You have <strong>7 days</strong> from the date of delivery to initiate a return or exchange. Returns requested after this period will not be accepted except in cases of manufacturing defects discovered later.
              </p>
            </div>
          </section>

          {/* Eligible Returns */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <CheckCircle size={32} />
              <h2 className="text-3xl font-bold m-0">Eligible for Return</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed mb-6">
                We accept returns under the following conditions:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-black p-6">
                  <h3 className="font-bold text-lg mb-3">Defective Products</h3>
                  <p className="text-sm text-gray-700">Caps with manufacturing defects, such as stitching issues, material flaws, or damage.</p>
                </div>
                <div className="border-2 border-black p-6">
                  <h3 className="font-bold text-lg mb-3">Wrong Item Received</h3>
                  <p className="text-sm text-gray-700">If you received a different cap than what you ordered in terms of style, color, or design.</p>
                </div>
                <div className="border-2 border-black p-6">
                  <h3 className="font-bold text-lg mb-3">Damaged in Transit</h3>
                  <p className="text-sm text-gray-700">Caps that arrived damaged due to shipping issues (with photographic evidence required).</p>
                </div>
                <div className="border-2 border-black p-6">
                  <h3 className="font-bold text-lg mb-3">Size/Fit Issues</h3>
                  <p className="text-sm text-gray-700">If the cap doesn't fit as expected (must be unworn with all tags attached).</p>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Return Conditions</h3>
                <p className="text-gray-700 mb-3">For a successful return, the cap must:</p>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">✓</span>
                    <span>Be in original, unused condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">✓</span>
                    <span>Have all original tags and labels attached</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">✓</span>
                    <span>Be returned in original packaging (if available)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">✓</span>
                    <span>Show no signs of wear, washing, or alterations</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Non-Returnable */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <XCircle size={32} />
              <h2 className="text-3xl font-bold m-0">Non-Returnable Items</h2>
            </div>
            
            <div className="bg-gray-50 border-2 border-black p-6">
              <p className="mb-4 text-gray-700 leading-relaxed">The following items cannot be returned:</p>
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">01</span>
                  <span>Customized or personalized caps with custom embroidery, patches, or designs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">02</span>
                  <span>Caps that have been worn, washed, or show signs of use</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">03</span>
                  <span>Items without original tags or labels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">04</span>
                  <span>Sale or clearance items (unless defective)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">05</span>
                  <span>Items returned after the 7-day return window</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Return Process */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Package size={32} />
              <h2 className="text-3xl font-bold m-0">How to Initiate a Return</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Step 1: Contact Us</h3>
                <p className="text-gray-700 leading-relaxed">
                  Email us at <strong>returns@mrxycaps.com</strong> with your order number, reason for return, and photos of the item (if defective or damaged). Our team will respond within 24-48 hours.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Step 2: Receive Return Authorization</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once your return is approved, you'll receive a Return Authorization Number (RAN) and instructions for shipping the item back to us.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Step 3: Ship the Item</h3>
                <p className="text-gray-700 leading-relaxed">
                  Pack the cap securely in its original packaging (if available) and ship it to the address provided. Include your RAN in the package. We recommend using a trackable shipping method.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Step 4: Inspection & Refund</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once we receive and inspect your return, we'll process your refund or exchange within 5-7 business days.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Costs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Return Shipping Costs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">We Cover Shipping</h3>
                <p className="text-sm">For defective items, wrong items shipped, or items damaged in transit, we will provide a prepaid return label or reimburse your return shipping costs.</p>
              </div>
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">You Cover Shipping</h3>
                <p className="text-sm text-gray-700">For returns due to size/fit issues or buyer's remorse, the customer is responsible for return shipping costs.</p>
              </div>
            </div>
          </section>

          {/* Refund Method */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Refund Method & Timeline</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Original Payment Method</h3>
                <p className="text-gray-700 leading-relaxed">
                  Refunds will be issued to your original payment method (credit card, debit card, UPI, or net banking) within <strong>5-7 business days</strong> after we receive and inspect the returned item.
                </p>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Processing Time</h3>
                <p className="text-gray-700 leading-relaxed">
                  Please allow an additional 5-10 business days for the refund to reflect in your account, depending on your bank or payment provider.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Partial Refunds</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  In some cases, partial refunds may be granted for:
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Items with obvious signs of use or missing tags</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Items returned without original packaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Items damaged after delivery (not our responsibility)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <AlertCircle size={32} />
              <h2 className="text-3xl font-bold m-0">Exchanges</h2>
            </div>
            
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                We accept exchanges for different sizes or colors within the 7-day return window. To request an exchange, follow the same return process and indicate your preferred replacement item. Once we receive your return, we'll ship the new item at no additional cost (subject to availability).
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Note:</strong> If the replacement item has a different price, you'll either receive a refund for the difference or be charged the additional amount.
              </p>
            </div>
          </section>

          {/* Damaged or Defective Items */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Damaged or Defective Items</h2>
            
            <div className="bg-black text-white p-8 border-2 border-black">
              <p className="leading-relaxed mb-4">
                If you receive a damaged or defective cap, please contact us immediately with:
              </p>
              <ul className="list-none space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Your order number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Clear photos of the defect or damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Description of the issue</span>
                </li>
              </ul>
              <p className="mt-4 leading-relaxed">
                We'll arrange for a replacement or full refund, including return shipping costs. Your satisfaction is our priority!
              </p>
            </div>
          </section>

          {/* Cancellations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Order Cancellations</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Before Shipping</h3>
                <p className="text-gray-700">Orders can be cancelled free of charge before they are shipped. Contact us as soon as possible at <strong>support@mrxycaps.com</strong> with your order number.</p>
              </div>
              
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">After Shipping</h3>
                <p className="text-gray-700">Once an order has been shipped, it cannot be cancelled. However, you can refuse delivery and the item will be returned to us. A refund will be processed once we receive the item back, minus any return shipping fees charged by the courier.</p>
              </div>
              
              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Customized Orders</h3>
                <p className="text-gray-700">Orders for customized or personalized caps cannot be cancelled once production has begun. Please review your customization details carefully before placing your order.</p>
              </div>
            </div>
          </section>

          {/* Lost or Stolen Packages */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Lost or Stolen Packages</h2>
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                We are not responsible for packages that are marked as delivered by the courier but reported as lost or stolen. We recommend:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Checking with neighbors or building management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Verifying the delivery address provided was correct</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Contacting the courier service directly</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                If you believe your package was stolen, please file a police report and contact us. We'll do our best to assist you with the courier's investigation.
              </p>
            </div>
          </section>

          {/* International Orders */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">International Orders</h2>
            <div className="bg-gray-50 border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed">
                For international orders, customers are responsible for return shipping costs and any customs duties or taxes incurred. Refunds will be processed in the original currency, and international returns may take longer to process (10-15 business days). Please contact us before initiating an international return.
              </p>
            </div>
          </section>

          {/* Contact for Returns */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Contact Us for Returns</h2>
            <div className="bg-black text-white p-8 border-2 border-black">
              <p className="mb-6 text-lg">
                Have questions about returns or need assistance? We're here to help!
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold">Returns Email:</span>
                  <span>returns@mrxycaps.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">Support Email:</span>
                  <span>support@mrxycaps.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">Phone:</span>
                  <span>+91-9920910956</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">Website:</span>
                  <span>www.mrxycaps.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold">Return Address:</span>
                  <span><br />ground floor, Saikrupa society, Building no 58, G1/2/3/4, Nehru Nagar, Kurla, Mumbai, Maharashtra 400024</span>
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
            This Refund & Return Policy is subject to change without notice. Please review it periodically for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;