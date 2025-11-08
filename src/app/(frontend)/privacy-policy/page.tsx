import React from 'react';
import { Shield, Lock, Eye, FileText, UserCheck, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b-4 border-black bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-4">
            <Shield size={48} />
            <h1 className="text-5xl font-bold tracking-tight">Privacy Policy</h1>
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
              At <strong>mrxycaps</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases from our online store.
            </p>
          </div>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <FileText size={32} />
              <h2 className="text-3xl font-bold m-0">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  When you create an account or place an order, we collect:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Name (first and last name)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Phone number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Shipping and billing address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-1">•</span>
                    <span>Payment information (processed securely through Razorpay)</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We automatically collect certain information when you visit our website, including IP address, browser type, operating system, referring URLs, pages viewed, and time spent on our site. We use cookies and similar tracking technologies to enhance your browsing experience.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-2xl font-bold mb-3">Order Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We collect information about your purchases, including products ordered, quantities, prices, and order history to fulfill your orders and improve our services.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Eye size={32} />
              <h2 className="text-3xl font-bold m-0">How We Use Your Information</h2>
            </div>
            
            <div className="bg-gray-50 border-2 border-black p-6">
              <p className="mb-4 text-gray-700 leading-relaxed">We use the information we collect to:</p>
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">01</span>
                  <span>Process and fulfill your orders, including shipping and delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">02</span>
                  <span>Communicate with you about your orders, account, and customer service inquiries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">03</span>
                  <span>Send promotional emails and marketing communications (with your consent)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">04</span>
                  <span>Improve our website, products, and services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">05</span>
                  <span>Prevent fraud and enhance security</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold mt-0.5">06</span>
                  <span>Comply with legal obligations and enforce our terms</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Globe size={32} />
              <h2 className="text-3xl font-bold m-0">Information Sharing and Disclosure</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-black p-4">
                  <h3 className="font-bold text-lg mb-2">Service Providers</h3>
                  <p className="text-sm text-gray-700">Third-party companies that help us operate our business, such as payment processors, shipping companies, and email service providers.</p>
                </div>
                <div className="border-2 border-black p-4">
                  <h3 className="font-bold text-lg mb-2">Legal Requirements</h3>
                  <p className="text-sm text-gray-700">When required by law or to protect our rights, property, or safety, or that of our customers or others.</p>
                </div>
                <div className="border-2 border-black p-4">
                  <h3 className="font-bold text-lg mb-2">Business Transfers</h3>
                  <p className="text-sm text-gray-700">In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</p>
                </div>
                <div className="border-2 border-black p-4">
                  <h3 className="font-bold text-lg mb-2">With Your Consent</h3>
                  <p className="text-sm text-gray-700">When you explicitly consent to sharing your information with third parties.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <Lock size={32} />
              <h2 className="text-3xl font-bold m-0">Data Security</h2>
            </div>
            
            <div className="bg-black text-white p-8 border-2 border-black">
              <p className="leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-none space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">✓</span>
                  <span>SSL encryption for data transmission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">✓</span>
                  <span>Secure payment processing through Razorpay</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">✓</span>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-1">✓</span>
                  <span>Restricted access to personal information</span>
                </li>
              </ul>
              <p className="mt-4 text-gray-300 text-sm">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
              <UserCheck size={32} />
              <h2 className="text-3xl font-bold m-0">Your Rights and Choices</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Access and Update</h3>
                <p className="text-gray-700">You can access and update your account information at any time by logging into your account.</p>
              </div>
              
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Marketing Communications</h3>
                <p className="text-gray-700">You can opt out of receiving promotional emails by clicking the "unsubscribe" link in any marketing email or by contacting us directly.</p>
              </div>
              
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Cookies</h3>
                <p className="text-gray-700">You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.</p>
              </div>
              
              <div className="border-2 border-black p-6">
                <h3 className="font-bold text-xl mb-3">Data Deletion</h3>
                <p className="text-gray-700">You can request deletion of your account and personal data by contacting us. Some information may be retained as required by law or for legitimate business purposes.</p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Children's Privacy</h2>
            <div className="border-l-4 border-black pl-6">
              <p className="text-gray-700 leading-relaxed">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-black">Changes to This Privacy Policy</h2>
            <div className="bg-gray-50 border-2 border-black p-6">
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our website after such changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-black">Contact Us</h2>
            <div className="bg-black text-white p-8 border-2 border-black">
              <p className="mb-6 text-lg">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold">Email:</span>
                  <span>privacy@mrxycaps.com</span>
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
          <p className="text-sm text-gray-600">
            By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;