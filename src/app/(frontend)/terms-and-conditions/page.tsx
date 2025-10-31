export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-white text-black px-6 md:px-24 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-semibold text-center border-b pb-4 border-black">
          Terms & Conditions
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">1. Introduction</h2>
          <p className="leading-relaxed text-gray-800">
            Welcome to <strong>MrxyCaps</strong>. By accessing or using our
            website <strong>www.mrxycaps.in</strong> and purchasing our
            products, you agree to comply with and be bound by the following
            terms and conditions. Please read them carefully before using our
            services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">2. Eligibility</h2>
          <p className="leading-relaxed text-gray-800">
            By using our site, you confirm that you are at least 18 years of age
            or accessing the site under the supervision of a parent or legal
            guardian. Individuals under 18 may use the platform only with
            parental involvement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">3. Product Information</h2>
          <p className="leading-relaxed text-gray-800">
            We make every effort to display product colors, descriptions, and
            details accurately. However, variations may occur due to lighting or
            display differences. <strong>MrxyCaps</strong> is not liable for
            such minor discrepancies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">4. Pricing & Payments</h2>
          <p className="leading-relaxed text-gray-800">
            All prices are listed in Indian Rupees (INR) and include applicable
            taxes unless stated otherwise. We reserve the right to change prices
            at any time without prior notice. Orders will be billed at the price
            in effect when the purchase is made.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">5. Order Acceptance</h2>
          <p className="leading-relaxed text-gray-800">
            Your order represents an offer to purchase our products. We reserve
            the right to accept or decline any order for any reason, including
            unavailability of stock, payment issues, or incorrect pricing
            information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">6. Shipping & Delivery</h2>
          <p className="leading-relaxed text-gray-800">
            Orders are processed and shipped as per our{" "}
            <a
              href="/shipping-policy"
              className="underline hover:text-gray-600"
            >
              Shipping Policy
            </a>
            . Delivery timelines are estimates and not guaranteed due to factors
            beyond our control such as logistics delays or natural events.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">7. Returns & Refunds</h2>
          <p className="leading-relaxed text-gray-800">
            Returns and refunds are handled according to our{" "}
            <a
              href="/refund-policy"
              className="underline hover:text-gray-600"
            >
              Refund Policy
            </a>
            . Please review the policy before making a purchase.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">8. Intellectual Property</h2>
          <p className="leading-relaxed text-gray-800">
            All content, including text, images, logos, and graphics displayed
            on <strong>MrxyCaps</strong> is the intellectual property of the
            brand. Unauthorized reproduction or use of any content is strictly
            prohibited.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">9. Limitation of Liability</h2>
          <p className="leading-relaxed text-gray-800">
            <strong>MrxyCaps</strong> shall not be held liable for any direct,
            indirect, incidental, or consequential damages arising from the use
            or inability to use our website or products, including but not
            limited to loss of data, profits, or reputation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">10. User Conduct</h2>
          <p className="leading-relaxed text-gray-800">
            You agree not to misuse the website for any unlawful or prohibited
            activity. Any violation may result in termination of your access to
            the site and legal action if necessary.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">11. Changes to Terms</h2>
          <p className="leading-relaxed text-gray-800">
            We reserve the right to modify or update these Terms & Conditions at
            any time. The revised version will be effective upon posting on the
            website. It is your responsibility to review them periodically.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">12. Contact Us</h2>
          <p className="leading-relaxed text-gray-800">
            For any questions about these Terms & Conditions, please contact us
            at{" "}
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
