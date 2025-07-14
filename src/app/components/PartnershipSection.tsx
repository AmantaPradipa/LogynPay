import Image from 'next/image';

const logos = [
    { name: 'Visa', src: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg', width: 80, height: 30 },
    { name: 'Mastercard', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg', width: 80, height: 50 },
    { name: 'PayPal', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg', width: 100, height: 28 },
    { name: 'Stripe', src: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', width: 70, height: 30 },
    { name: 'Apple Pay', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg', width: 80, height: 32 },
    { name: 'Google Pay', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg', width: 80, height: 32 },
    { name: 'Amazon Pay', src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg', width: 100, height: 20 },
    { name: 'Shopify', src: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg', width: 100, height: 28 },
];

const PartnershipSection = () => {
    return (
        <section className="py-12" data-aos="fade-up">
            <div className="container mx-auto px-4 sm:px-6">
                <p className="text-center text-white/50 mb-8">Trusted by leading companies worldwide</p>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
                    {logos.map((logo) => (
                        <div
                            key={logo.name}
                            className="group relative flex items-center justify-center"
                        >
                            <Image
                                src={logo.src}
                                alt={`${logo.name} logo`}
                                width={logo.width}
                                height={logo.height}
                                className="h-8 w-auto object-contain transition-all duration-300 ease-in-out filter grayscale group-hover:filter-none group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnershipSection;