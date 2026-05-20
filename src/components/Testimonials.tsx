import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import RevealText from "./RevealText";

const testimonials = [
  {
    quote: "I haven't tasted a tomato like this since my grandmother's kitchen. Genuinely emotional.",
    name: "Anika Sharma",
    role: "Chef, Bombay Canteen",
  },
  {
    quote: "Their box arrives and our whole café smells like summer. We've stopped buying anywhere else.",
    name: "Marco Vitelli",
    role: "Owner, Pasta Madre",
  },
  {
    quote: "You can taste the care. There's nothing hiding behind a label here.",
    name: "Priya Iyer",
    role: "Food writer",
  },
  {
    quote: "Ramesh sent us a hand-written note with our first basket. It's that kind of farm.",
    name: "Daniel Okafor",
    role: "Subscriber, 3 years",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#2E7D32] py-32 text-[#FDF8F4] md:py-48">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50% 60% at 20% 30%, rgba(76,175,80,0.6), transparent 70%), radial-gradient(40% 50% at 80% 80%, rgba(255,112,67,0.4), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.32em] text-[#FDF8F4]/70">
            <span className="mr-3">◍</span>Whispers from the table
          </div>
          <RevealText
            as="h2"
            className="font-display text-5xl font-light leading-[0.95] tracking-[-0.02em] md:text-7xl"
          >
            What people say after the first bite.
          </RevealText>
          <p className="mt-6 max-w-md text-base text-[#FDF8F4]/70 md:text-lg">
            Chefs, neighbours, strangers who became friends. A few of the messages we keep on the kitchen wall.
          </p>
        </div>

        <div className="relative h-[420px]">
          <Swiper
            modules={[EffectCards, Autoplay]}
            effect="cards"
            grabCursor
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="h-full w-[320px] md:w-[420px]"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide
                key={i}
                className="!flex flex-col justify-between rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl"
              >
                <div className="font-display text-2xl leading-snug md:text-3xl">"{t.quote}"</div>
                <div>
                  <div className="text-sm">{t.name}</div>
                  <div className="text-xs uppercase tracking-[0.24em] text-[#FDF8F4]/60">
                    {t.role}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
