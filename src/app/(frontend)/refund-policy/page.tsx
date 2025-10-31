export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white text-black px-6 md:px-24 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-semibold text-center border-b pb-4 border-black">
          Refund & Return Policy
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">1. Overview</h2>
          <p className="leading-relaxed text-gray-800">
            At <strong>MrxyCaps</strong>, we strive to ensure that every
            purchase you make brings satisfaction. If you are not completely
            happy with your order, we offer a simple and transparent refund and
            return policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">2. Eligibility for Returns</h2>
          <p className="leading-relaxed text-gray-800">
            To be eligible for a return, your item must be unused, unworn, and
            in the same condition that you received it. It must also be in the
            original packaging with tags intact.
          </p>
          <p className="leading-relaxed text-gray-800">
            Returns must be initiated within <strong>7 days</strong> of
            receiving the product. After this period, we cannot accept return or
            refund requests.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">3. Non-Returnable Items</h2>
          <p className="leading-relaxed text-gray-800">
            The following items are not eligible for return or refund:
          </p>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Items purchased during clearance or sale events</li>
            <li>Gift cards or discount vouchers</li>
            <li>Customized or personalized caps</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">4. Return Process</h2>
          <p className="leading-relaxed text-gray-800">
            To initiate a return, please contact us at{" "}
            <a
              href="mailto:support@mrxycaps.in"
              className="underline hover:text-gray-600"
            >
              support@mrxycaps.in
            </a>{" "}
            with your order ID and reason for return. Once approved, you’ll
            receive instructions for sending your item back to us.
          </p>
          <p className="leading-relaxed text-gray-800">
            Please note that customers are responsible for return shipping
            costs, unless the item is defective or incorrect.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">5. Refunds</h2>
          <p className="leading-relaxed text-gray-800">
            Once your returned item is received and inspected, we will notify
            you of the approval or rejection of your refund. Approved refunds
            will be processed within <strong>5–7 business days</strong> to your
            original method of payment.
          </p>
          <p className="leading-relaxed text-gray-800">
            If your refund is delayed, please check with your bank or payment
            provider, as processing times may vary.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">6. Exchanges</h2>
          <p className="leading-relaxed text-gray-800">
            We only replace items if they are defective or damaged. If you need
            to exchange it for the same product, please email us at{" "}
            <a
              href="mailto:support@mrxycaps.in"
              className="underline hover:text-gray-600"
            >
              support@mrxycaps.in
            </a>{" "}
            with your order details.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">7. Late or Missing Refunds</h2>
          <p className="leading-relaxed text-gray-800">
            If you haven’t received your refund within the expected time, please
            check your bank account again and contact your credit card company.
            If the issue persists, reach out to us at{" "}
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
