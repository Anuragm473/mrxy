import React from 'react';
import { FileText, ShoppingCart, CreditCard, Scale, AlertCircle, Users } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b-4 border-black bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-4">
            <FileText size={48} />
            <h1 className="text-5xl font-bold tracking-tight">Terms & Conditions</h1>
          </div>
          <p className="text-xl text-gray-300">Last updated: October 31, 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="mb-12 p-8 border-2 border-black">
            <p className="text-lg leading-relaxed mb-4">
              Welcome to <strong>mrxycaps</strong>! These Terms and Conditions govern your use of our website and the purchase of products from our online store. By accessing or using our website, you agree to be bound by these Terms and Conditions.
            </p>
            <p className="text-lg leading-relaxed">
              Please read these terms carefully before using our services. If you do not agree with any part of these terms, you should not use our website or purchase our products.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Acceptance of Terms</h2>
            
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                By using the mrxycaps website (www.mrxycaps.com), creating an account, or making a purchase, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy, Refund Policy, and Shipping Policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update, change, or replace any part of these Terms and Conditions at any time without prior notice. It is your responsibility to check this page periodically for changes. Your continued use of the website after changes are posted constitutes acceptance of those changes.
              </p>
            </div>
          </section>

          {/* Eligibility */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Users size={32} />
              <h2 className="text-3xl font-bold m-0">Eligibility</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">Age Requirement</h3>
                <p className="leading-relaxed">
                  You must be at least 18 years old to use our website and make purchases. By using our services, you represent that you are at least 18 years of age and have the legal capacity to enter into binding contracts.
                </p>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Account Registration</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  When you create an account with us, you must:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Provide accurate, current, and complete information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Maintain and update your information to keep it accurate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Keep your password secure and confidential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Accept responsibility for all activities under your account</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent, abusive, or illegal activities.
                </p>
              </div>
            </div>
          </section>

          {/* Products and Pricing */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <ShoppingCart size={32} />
              <h2 className="text-3xl font-bold m-0">Products & Pricing</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Product Descriptions</h3>
                <p className="text-gray-700 leading-relaxed">
                  We strive to provide accurate descriptions, images, and specifications of our caps. However, we do not warrant that product descriptions, colors, or other content on our website are completely accurate, current, or error-free. Colors may vary slightly due to screen display settings.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Pricing</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless otherwise stated. We reserve the right to:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Change prices at any time without prior notice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Correct pricing errors even after orders are placed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Cancel orders if pricing errors are discovered</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Product Availability</h3>
                <p className="text-gray-700 leading-relaxed">
                  All products are subject to availability. We reserve the right to discontinue any product at any time. In the event a product is unavailable after you place an order, we will notify you and offer a refund or substitute product.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Promotional Offers</h3>
                <p className="text-gray-700 leading-relaxed">
                  Promotional codes and discounts cannot be combined unless explicitly stated. Promotions are valid for a limited time and may be subject to additional terms and conditions. We reserve the right to modify or cancel promotions at any time.
                </p>
              </div>
            </div>
          </section>

          {/* Orders and Payment */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <CreditCard size={32} />
              <h2 className="text-3xl font-bold m-0">Orders & Payment</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">Order Acceptance</h3>
                <p className="leading-relaxed mb-3">
                  Your order constitutes an offer to purchase products from us. We reserve the right to:
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Accept or decline your order for any reason</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Limit quantities purchased per person or household</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Refuse orders from dealers or resellers</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Payment Methods</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We accept the following payment methods:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="border-2 border-black p-3 text-center text-sm font-bold">Credit Card</div>
                  <div className="border-2 border-black p-3 text-center text-sm font-bold">Debit Card</div>
                  <div className="border-2 border-black p-3 text-center text-sm font-bold">UPI</div>
                  <div className="border-2 border-black p-3 text-center text-sm font-bold">Net Banking</div>
                  <div className="border-2 border-black p-3 text-center text-sm font-bold">Wallets</div>
                  <div className="border-2 border-black p-3 text-center text-sm font-bold">COD</div>
                  <div className="border-2 border-black p-3 text-center text-sm font-bold">EMI</div>
                  <div className="border-2 border-black p-3 text-center text-sm font-bold">Pay Later</div>
                </div>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Payment Processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  All payments are processed securely through Razorpay. We do not store your payment card information on our servers. By providing payment information, you represent that you are authorized to use the payment method and authorize us to charge the total amount of your order.
                </p>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Cash on Delivery (COD)</h3>
                <p className="text-gray-700 leading-relaxed">
                  COD is available for select PIN codes. A COD fee may apply. Orders exceeding ₹10,000 are not eligible for COD. We reserve the right to refuse COD orders based on order history or verification requirements.
                </p>
              </div>

              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">Failed or Declined Payments</h3>
                <p className="leading-relaxed">
                  If your payment is declined or fails, your order will not be processed. We are not responsible for delays caused by payment issues. Please contact your bank or payment provider for assistance.
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Intellectual Property Rights</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-black pl-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  All content on the mrxycaps website, including but not limited to text, graphics, logos, images, product descriptions, designs, and software, is the property of mrxycaps or its content suppliers and is protected by Indian and international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You may not reproduce, distribute, modify, create derivative works from, publicly display, or exploit any content from our website without our express written permission.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Trademark Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  "mrxycaps", our logo, and other marks displayed on our website are registered or unregistered trademarks of mrxycaps. You may not use these trademarks without our prior written consent.
                </p>
              </div>
            </div>
          </section>

          {/* User Conduct */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <AlertCircle size={32} />
              <h2 className="text-3xl font-bold m-0">User Conduct</h2>
            </div>
            
            <div className="bg-gray-50 border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree NOT to use our website to:
              </p>
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">01</span>
                  <span>Violate any applicable laws or regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">02</span>
                  <span>Transmit any harmful or malicious code, viruses, or malware</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">03</span>
                  <span>Engage in fraudulent activities or misrepresent yourself</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">04</span>
                  <span>Harass, abuse, or harm other users or our staff</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">05</span>
                  <span>Scrape, crawl, or use automated systems to access our website</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">06</span>
                  <span>Attempt to gain unauthorized access to our systems or data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">07</span>
                  <span>Use the website for commercial purposes without authorization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">08</span>
                  <span>Post or transmit inappropriate, offensive, or illegal content</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Reviews and User Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Reviews & User-Generated Content</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Submission of Reviews</h3>
                <p className="text-gray-700 leading-relaxed">
                  You may submit reviews, comments, or other content about our products. By submitting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display such content for marketing and promotional purposes.
                </p>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Content Guidelines</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  User-generated content must:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Be honest and based on your genuine experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Not contain offensive, discriminatory, or inappropriate language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Not include personal information about others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Not promote competing products or services</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black text-white p-6 border-2 border-black">
                <h3 className="font-bold text-xl mb-3">Content Moderation</h3>
                <p className="leading-relaxed">
                  We reserve the right to remove, edit, or reject any user-generated content that violates these guidelines or is deemed inappropriate at our sole discretion.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Scale size={32} />
              <h2 className="text-3xl font-bold m-0">Limitation of Liability</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 border-2 border-black p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the maximum extent permitted by law, mrxycaps shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Loss of profits or revenue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Loss of data or business opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Service interruptions or website downtime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Errors, mistakes, or inaccuracies of content</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Maximum Liability</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our total liability to you for any claims arising from your use of our website or purchase of products shall not exceed the amount you paid for the product(s) in question.
                </p>
              </div>

              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">Disclaimer of Warranties</h3>
                <p className="leading-relaxed">
                  Our website and products are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our website will be uninterrupted, secure, or error-free.
                </p>
              </div>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Indemnification</h2>
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless mrxycaps, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including legal fees) arising from your use of our website, violation of these Terms and Conditions, or infringement of any third-party rights.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Third-Party Links & Services</h2>
            <div className="bg-gray-50 border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website may contain links to third-party websites or services (such as payment processors, social media platforms, or shipping partners). These links are provided for your convenience only.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for the content, privacy practices, or terms of use of any third-party websites. Your interactions with third-party services are solely between you and the third party. We encourage you to review their terms and policies.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Privacy</h2>
            <div className="border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed">
                Your use of our website is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information. By using our website, you consent to the practices described in our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Governing Law & Dispute Resolution</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6 bg-black text-white">
                <h3 className="font-bold text-xl mb-3">Governing Law</h3>
                <p className="leading-relaxed">
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
              </div>

              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Jurisdiction</h3>
                <p className="text-gray-700 leading-relaxed">
                  Any disputes arising from these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Dispute Resolution</h3>
                <p className="text-gray-700 leading-relaxed">
                  We encourage you to contact us first to resolve any disputes informally. If we cannot resolve the dispute through direct negotiation, you agree to attempt mediation before pursuing litigation.
                </p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Termination</h2>
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to suspend or terminate your access to our website and services at any time, without notice, for any reason, including but not limited to:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Violation of these Terms and Conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Fraudulent or suspicious activity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Non-payment or repeated payment failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>Abuse of our services or staff</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Severability */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Severability</h2>
            <div className="bg-gray-50 border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms and Conditions is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced with a valid provision that most closely reflects the intent of the original provision.
              </p>
            </div>
          </section>

          {/* Entire Agreement */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Entire Agreement</h2>
            <div className="border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions, together with our Privacy Policy, Refund Policy, and Shipping Policy, constitute the entire agreement between you and mrxycaps regarding your use of our website and supersede all prior agreements and understandings.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Contact Us</h2>
            <div className="bg-black text-white p-8 border-2 border-black">
              <p className="mb-6 text-lg">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold">Email:</span>
                  <span>legal@mrxycaps.com</span>
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
                  <span className="font-bold">Address:</span>
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
          <p className="text-sm text-gray-600 mb-2">
            By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
          <p className="text-sm text-gray-600">
            These Terms and Conditions were last updated on October 31, 2024.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;