import ScheduleButton from "../ScheduleButton/ScheduleButton";

export default function SectionHomePrima() {
    return (
      <main className="">
  
        {/* HERO */}
        <section className="bg-[#FBF0CF] rounded-2xl max-w-7xl mx-auto mt-16 px-8 py-16">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
  
            {/* Image */}
            <img
              src="/images/balloon.png"
              alt="Hot air balloon"
              className="max-w-sm mx-auto md:mx-0"
            />
  
            {/* Text */}
            <div>
              <h1 className="mb-6 font-serif text-4xl leading-tight md:text-5xl">
                Five Pathways is <br />
                here to simplify your <br />
                retirement planning.
              </h1>
  
              <p className="max-w-md mb-8 text-sm text-gray-700">
                We’ll work with you to create a personalized strategy that
                incorporates all of the paths of retirement planning by focusing
                on what is most important to you.
              </p>
  
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-2 text-sm transition border border-black rounded-full hover:bg-black hover:text-white">
                  Schedule a meeting →
                </button>
  
                <ScheduleButton text='learn more' />
              </div>
            </div>
          </div>
        </section>
  
        {/* POWERED BY */}
        <section className="py-16 text-center">
          <p className="mb-8 text-sm italic">Powered by</p>
  
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-80">
            {[
              "logo1",
              "logo2",
              "logo3",
              "logo4",
              "logo5",
              "logo6",
            ].map((logo, index) => (
              <img
                key={index}
                src={`/images/${logo}.svg`}
                alt={logo}
                className="object-contain h-6"
              />
            ))}
          </div>
        </section>
  
        {/* PRODUCTS */}
        <div className="bg-[#F4F7EF] py-40">
        <section className="px-6 pb-24 mx-auto max-w-7xl">
          <p className="mb-6 text-xs tracking-widest uppercase">
            Our Products
          </p>
  
          <div className="grid items-start grid-cols-1 gap-12 md:grid-cols-3">
  
            {/* Left text */}
            <div className="md:col-span-1">
              <h2 className="mb-6 font-serif text-6xl leading-tight">
                It’s ok to stop and  ask for directions.
              </h2>
  
              <p className="leading-relaxed text-gray-700 text-md">
                Don’t confuse a portfolio with an actual plan. A few vague
                directions from an advisor just won’t cut it. What you need is
                a true financial guide—someone who’s traveled this road many
                times and knows the best routes to success.
              </p>
            </div>
  
            {/* Cards */}
            <div className="grid grid-cols-1 gap-8 md:col-span-2 sm:grid-cols-2">
  
              {/* Card 1 */}
              <div className="p-6 bg-[#fffaf5] shadow-sm rounded-2xl">
                <div className="mb-4 text-lg">💰</div>
                <h3 className="mb-3 font-serif text-lg">
                  Income Planning
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Income planning looks different for everyone. Potentially
                  consisting of investments, Social Security, pensions, and
                  annuities.
                </p>
              </div>
  
              {/* Card 2 */}
              <div className="p-6 bg-[#fffaf5] shadow-sm rounded-2xl">
                <div className="mb-4 text-lg">☂️</div>
                <h3 className="mb-3 font-serif text-lg">
                  Legacy Planning
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Leaving a legacy means a lot of different things. Whether
                  you’re someone who wants to leave a financial legacy or
                  something more.
                </p>
              </div>

              <div className="p-6 bg-[#fffaf5] shadow-sm rounded-2xl">
                <div className="mb-4 text-lg">☂️</div>
                <h3 className="mb-3 font-serif text-lg">
                  Legacy Planning
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Leaving a legacy means a lot of different things. Whether
                  you’re someone who wants to leave a financial legacy or
                  something more.
                </p>
              </div>

              <div className="p-6 bg-[#fffaf5] shadow-sm rounded-2xl">
                <div className="mb-4 text-lg">☂️</div>
                <h3 className="mb-3 font-serif text-lg">
                  Legacy Planning
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Leaving a legacy means a lot of different things. Whether
                  you’re someone who wants to leave a financial legacy or
                  something more.
                </p>
              </div>
  
            </div>

            
          </div>
        </section>
        </div>
  
      </main>
    );
  }
  