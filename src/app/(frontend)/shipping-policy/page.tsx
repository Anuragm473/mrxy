export default function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-white text-black px-6 md:px-24 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-semibold text-center border-b pb-4 border-black">
          Shipping Policy
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">1. Order Processing</h2>
          <p className="leading-relaxed text-gray-800">
            All orders placed on <strong>MrxyCaps</strong> are processed within
            1–2 business days. You will receive an email confirmation with your
            order details once your purchase is confirmed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">2. Shipping Time</h2>
          <p className="leading-relaxed text-gray-800">
            Our standard shipping time is <strong>3–7 business days</strong>,
            depending on your location. Remote areas may take additional time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">3. Shipping Charges</h2>
          <p className="leading-relaxed text-gray-800">
            We offer <strong>free shipping</strong> on all prepaid orders above
            ₹499. For orders below ₹499, a nominal delivery fee of ₹49 applies.
            Cash-on-delivery orders may include an additional handling fee.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">4. Order Tracking</h2>
          <p className="leading-relaxed text-gray-800">
            Once your order is shipped, you’ll receive a tracking number via
            email or SMS. You can use this to monitor your delivery status in
            real time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">5. Delayed Deliveries</h2>
          <p className="leading-relaxed text-gray-800">
            While we strive to ensure timely delivery, delays may occur due to
            unforeseen circumstances such as weather, customs, or courier
            issues. We appreciate your patience and understanding in such cases.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">6. Damaged or Lost Packages</h2>
          <p className="leading-relaxed text-gray-800">
            If your package arrives damaged or is lost during transit, please
            contact our support team within <strong>48 hours</strong> of
            delivery. We’ll investigate and arrange a replacement or refund as
            needed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">7. International Shipping</h2>
          <p className="leading-relaxed text-gray-800">
            Currently, we only ship within India. International shipping options
            will be available soon.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">8. Contact Us</h2>
          <p className="leading-relaxed text-gray-800">
            For any shipping-related queries, please reach out to us at{" "}
            <a
              href="mailto:support@mrxycaps.in"
              className="underline hover:text-gray-600"
            >
              support@mrxycaps.in
            </a>
            .
          </p>
        </section>

        <footer className="pt-10 border-t border-black text-center text-sm text-gray-700">
          © {new Date().getFullYear()} MrxyCaps. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
