import FaqItem from "@/components/FaqItem";

const faqs = [
  {
    question: "How does the buying process work if I'm overseas?",
    answer:
      "You can complete the entire process remotely. We verify the property, prepare documentation, and coordinate via WhatsApp or video call. A Power of Attorney can be arranged for signing and transfer if you're unable to travel to Pakistan.",
  },
  {
    question: "Are installment plans available?",
    answer:
      "Yes, several of our listings — particularly under-construction apartments — offer installment plans, typically a down payment followed by structured payments over 2–3 years. Availability depends on the specific property.",
  },
  {
    question: "How do you verify a listing before it goes live?",
    answer:
      "Every property is physically inspected by our team, and we confirm ownership documents and NOC status with the relevant housing authority before listing it on our site.",
  },
  {
    question: "Can I send money from abroad securely?",
    answer:
      "Yes. We only work with standard banking channels and legal foreign remittance methods — we never ask for payment outside verified, documented channels.",
  },
  {
    question: "What's the typical possession timeline for plots vs. built houses?",
    answer:
      "Ready plots and fully built houses can transfer within 2–4 weeks of agreement. Under-construction properties follow the developer's stated timeline, which we share upfront for every listing.",
  },
];

export default function FaqPage() {
  return (
    <main className="bg-[#FAF8F4] min-h-screen px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
            <h1 className="font-serif font-bold text-3xl text-[#1C2B2E] mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-[#6B6F6C] mb-10">
              Common questions from overseas and first-time buyers
            </p>

            <div className="max-w-2xl">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
        </div>
    </main>
  );
}