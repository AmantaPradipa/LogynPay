import Image from "next/image";
import Link from "next/link";
import PartnershipSection from "./components/PartnershipSection";

export default function Home() {
  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white max-w-4xl mx-auto leading-tight" data-aos="fade-up">
            Digital Transformation for<br />
            <span className="text-green-400">Modern Payment Systems</span>
            <span className="typing-cursor-dark"></span>
          </h1>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-6 rounded-full" data-aos="fade-up" data-aos-delay="200"></div>
          
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            A complete payment solution with high-level security and a seamless user experience for your business.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-up" data-aos-delay="400">
            <Link href="/register" className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 px-10 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/50">
              <span>Get Started Free</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link href="#features" className="bg-transparent border-2 border-green-400 text-green-400 font-bold py-4 px-10 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-green-400 hover:text-gray-900">
              <span>Learn More</span>
              <i className="ri-information-line"></i>
            </Link>
          </div>
          
          <div className="mt-20 max-w-6xl mx-auto relative" data-aos="zoom-in-up" data-aos-duration="1000">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl opacity-20 blur-xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl glass-effect">
              <div className="bg-gray-800/50 h-10 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <Image 
                src="/images/dashboard-preview.jpg" 
                alt="LogynPay Dashboard" 
                width={1200} 
                height={600} 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <PartnershipSection />

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">Powerful Features</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-white/70">Everything you need to manage payments efficiently and securely</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card-dark p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-3xl text-green-400"></i>
              </div>
              <h3 className="font-bold text-xl text-white mb-3">Bank-Level Security</h3>
              <p className="text-white/70 mb-4">Advanced encryption and fraud detection to keep your transactions safe.</p>
              <Link href="#" className="text-green-400 font-medium inline-flex items-center">Learn more <i className="ri-arrow-right-line ml-2"></i></Link>
            </div>
            
            <div className="feature-card-dark p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                <i className="ri-exchange-dollar-line text-3xl text-blue-400"></i>
              </div>
              <h3 className="font-bold text-xl text-white mb-3">Global Payments</h3>
              <p className="text-white/70 mb-4">Accept payments from anywhere in the world with multi-currency support.</p>
              <Link href="#" className="text-green-400 font-medium inline-flex items-center">Learn more <i className="ri-arrow-right-line ml-2"></i></Link>
            </div>
            
            <div className="feature-card-dark p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <i className="ri-dashboard-line text-3xl text-green-400"></i>
              </div>
              <h3 className="font-bold text-xl text-white mb-3">Real-Time Analytics</h3>
              <p className="text-white/70 mb-4">Get insights into your transactions with a comprehensive dashboard and reports.</p>
              <Link href="#" className="text-green-400 font-medium inline-flex items-center">Learn more <i className="ri-arrow-right-line ml-2"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-white/70">Thousands of businesses trust LogynPay for their payment processing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-green-400">
                  <Image src="https://i.pravatar.cc/48?u=sarah" alt="Sarah Johnson" width={48} height={48} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Sarah Johnson</h4>
                  <p className="text-white/70 text-sm">CEO, Tech Innovations</p>
                </div>
              </div>
              <p className="text-white/80 mb-4">LogynPay has transformed the way we handle payments. The platform is intuitive, secure, and their customer support is outstanding.</p>
              <div className="flex text-yellow-400">
                <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i>
              </div>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-green-400">
                  <Image src="https://i.pravatar.cc/48?u=michael" alt="Michael Chen" width={48} height={48} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Michael Chen</h4>
                  <p className="text-white/70 text-sm">CFO, Global Retail</p>
                </div>
              </div>
              <p className="text-white/80 mb-4">Since switching to LogynPay, our payment processing fees have decreased by 22% while transaction success rates have significantly increased.</p>
              <div className="flex text-yellow-400">
                <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i>
              </div>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-green-400">
                  <Image src="https://i.pravatar.cc/48?u=emma" alt="Emma Rodriguez" width={48} height={48} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Emma Rodriguez</h4>
                  <p className="text-white/70 text-sm">E-commerce Manager</p>
                </div>
              </div>
              <p className="text-white/80 mb-4">The analytics dashboard alone is worth it. We've gained valuable insights that have helped optimize our checkout process.</p>
              <div className="flex text-yellow-400">
                <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-half-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">Flexible Pricing Plans</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-white/70">Choose a plan that fits your business needs. No hidden fees.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="feature-card-dark p-8 rounded-2xl flex flex-col" data-aos="fade-up" data-aos-delay="100">
              <div>
                <h3 className="font-bold text-xl text-white mb-2">Starter</h3>
                <p className="text-white/70 mb-6">Perfect for small businesses and startups</p>
                <div className="mb-8"><span className="text-4xl font-bold text-white">$29</span><span className="text-white/70">/month</span></div>
                <ul className="space-y-4 mb-8 text-white/90">
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Up to 500 transactions/month</li>
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Basic fraud protection</li>
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Email support</li>
                </ul>
              </div>
              <Link href="/register" className="mt-auto w-full text-center py-3 rounded-lg font-semibold bg-white/10 border border-white/20 hover:bg-white/20 transition">Get Started</Link>
            </div>
            
            <div className="pricing-card-dark popular feature-card-dark p-8 rounded-2xl flex flex-col relative" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">MOST POPULAR</div>
              <div>
                <h3 className="font-bold text-xl text-white mb-2">Professional</h3>
                <p className="text-white/70 mb-6">Ideal for growing businesses</p>
                <div className="mb-8"><span className="text-4xl font-bold text-white">$79</span><span className="text-white/70">/month</span></div>
                <ul className="space-y-4 mb-8 text-white/90">
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Up to 5,000 transactions/month</li>
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Advanced fraud protection</li>
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>24/7 email & chat support</li>
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Advanced analytics</li>
                </ul>
              </div>
              <Link href="/register" className="mt-auto w-full text-center py-3 rounded-lg font-semibold bg-green-500 hover:bg-green-600 transition shadow-lg hover:shadow-green-500/50">Get Started</Link>
            </div>
            
            <div className="feature-card-dark p-8 rounded-2xl flex flex-col" data-aos="fade-up" data-aos-delay="300">
              <div>
                <h3 className="font-bold text-xl text-white mb-2">Enterprise</h3>
                <p className="text-white/70 mb-6">For large businesses with custom needs</p>
                <div className="mb-8"><span className="text-4xl font-bold text-white">$199</span><span className="text-white/70">/month</span></div>
                <ul className="space-y-4 mb-8 text-white/90">
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Unlimited transactions</li>
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Premium fraud protection</li>
                  <li className="flex items-center"><i className="ri-check-line text-green-400 mr-2"></i>Dedicated account manager</li>
                </ul>
              </div>
              <Link href="#contact" className="mt-auto w-full text-center py-3 rounded-lg font-semibold bg-white/10 border border-white/20 hover:bg-white/20 transition">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-white/70">Find answers to common questions about LogynPay</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="faq-item-dark py-6" data-aos="fade-up" data-aos-delay="100">
              <button className="w-full flex justify-between items-center text-left faq-question">
                <h4 className="font-semibold text-lg text-white">How secure is LogynPay?</h4>
                <i className="ri-arrow-down-s-line text-2xl transition-transform duration-300"></i>
              </button>
              <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0">
                <p className="pt-4 text-white/70">LogynPay uses bank-level security with AES-256 encryption, PCI DSS compliance, and an advanced fraud detection system. We also offer two-factor authentication and regular security audits to ensure your data is always protected.</p>
              </div>
            </div>
            <div className="faq-item-dark py-6" data-aos="fade-up" data-aos-delay="200">
              <button className="w-full flex justify-between items-center text-left faq-question">
                <h4 className="font-semibold text-lg text-white">What payment methods do you support?</h4>
                <i className="ri-arrow-down-s-line text-2xl transition-transform duration-300"></i>
              </button>
              <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0">
                <p className="pt-4 text-white/70">We support all major credit and debit cards (Visa, Mastercard, American Express), digital wallets (Apple Pay, Google Pay), bank transfers, and over 30 alternative payment methods including PayPal, Alipay, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center" data-aos="zoom-in">
          <div className="glass-effect rounded-2xl p-10 md:p-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">Ready to Transform Your Payment System?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-12">Join thousands of businesses processing payments securely with LogynPay.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register" className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 px-10 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/50">
                <span>Get Started Free</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link href="#contact" className="bg-transparent border-2 border-green-400 text-green-400 font-bold py-4 px-10 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-green-400 hover:text-gray-900">
                <span>Contact Sales</span>
                <i className="ri-chat-3-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
