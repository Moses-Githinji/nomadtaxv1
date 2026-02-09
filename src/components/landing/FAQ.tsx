
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "Is my financial data secure?",
      answer: "Absolutely. We use bank-level encryption (AES-256) and read-only access to your accounts. We never store your bank login credentials.",
    },
    {
      question: "Does this replace my accountant?",
      answer: "NomadTax is designed to handle day-to-day compliance and tracking. For complex audits or corporate tax filing, we recommend consulting a certified CPA, but NomadTax prepares all the data they'll need.",
    },
    {
      question: "What if I have income from multiple currencies?",
      answer: "We support multi-currency accounts (USD, EUR, GBP, KES). The system automatically converts to KES for KRA reporting purposes using the daily CBK rate.",
    },
    {
      question: "Can I pay my taxes directly through the app?",
      answer: "Yes! We integrate with M-Pesa Paybill to allow you to remit PAYE, eTIMS, and Housing Levy directly from your tax reserve 'tank'.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`rounded-xl bg-white/5 border border-white/5 overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white/[0.08] border-white/10' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-slate-200">{faq.question}</span>
                {openIndex === index ? <Minus size={20} className="text-nomad-green" /> : <Plus size={20} className="text-slate-500" />}
              </button>
              
              <div 
                className={`px-6 text-slate-400 leading-relaxed overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
