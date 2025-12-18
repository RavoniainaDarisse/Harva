export default function InsightsSection() {
    return (
      <section className="px-6 py-20 ">
        <div className="mx-auto max-w-7xl">
  
          {/* TOP BAR */}
          <div className="flex justify-between mb-6 text-xs tracking-widest uppercase">
            <span>Your roadmap</span>
            <span>Five Pathways</span>
            <span>To retirement</span>
          </div>
  
          <hr className="mb-10 border-black" />
  
          {/* HEADER */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl">DEC.</span>
  
              <h1 className="font-serif tracking-wide text-8xl md:text-7xl">
                INSIGHTS
              </h1>
  
              <span className="text-xl">2025</span>
            </div>
  
            <p className="max-w-xl mx-auto text-sm text-gray-700">
              Let’s focus on things we can control—taxes, fees, and risk—
              and stop chasing the things we can’t.
            </p>
          </div>
  
          {/* RATES BAR */}
          <div className="mb-16 overflow-x-auto">
            <table className="w-full text-xs border-t border-b border-black">
              <tbody>
                <tr className="text-center">
                  <td className="py-3 font-medium text-left">Today’s rates</td>
                  {["5%", "5.6%", "5.2%", "6.3%", "5.7%", "6.5%", "5.4%", "5.25%", "5.8%"].map((r, i) => (
                    <td key={i} className="px-3">{r}</td>
                  ))}
                  <td className="underline cursor-pointer">See more</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          {/* CONTENT */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
  
            {/* MAIN ARTICLE */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden border rounded-xl">
                <img
                  src="/images/insight-main.jpg"
                  alt="Main insight"
                  className="w-full h-[360px] object-cover"
                />
  
                <div className="p-6">
                  <p className="mb-2 text-xs uppercase">Nov 25, 2024</p>
  
                  <h2 className="mb-6 font-serif text-3xl leading-tight">
                    Will Credit Card Rates Come Down? Five Pathways
                    Comments on CBSNews.com
                  </h2>
  
                  <button className="px-6 py-2 text-sm transition border border-black rounded-full hover:bg-black hover:text-white">
                    View More Insights
                  </button>
                </div>
              </div>
            </div>
  
            {/* SIDE ARTICLES */}
            <div className="space-y-8">
  
              {/* Card 1 */}
              <div className="overflow-hidden border rounded-xl">
                <img
                  src="/images/insight-1.jpg"
                  alt="Estate scam"
                  className="object-cover w-full h-40"
                />
  
                <div className="p-4">
                  <span className="inline-block px-2 py-1 mb-2 text-xs border rounded-full">
                    News
                  </span>
  
                  <p className="mb-1 text-xs text-gray-500">Nov 25, 2024</p>
  
                  <h3 className="font-serif text-lg leading-snug">
                    Five Pathways Featured On Multiple News Sites About
                    Estate Planning Scams
                  </h3>
                </div>
              </div>
  
              {/* Card 2 */}
              <div className="overflow-hidden border rounded-xl">
                <img
                  src="/images/insight-2.jpg"
                  alt="Retirement expenses"
                  className="object-cover w-full h-40"
                />
  
                <div className="p-4">
                  <span className="inline-block px-2 py-1 mb-2 text-xs border rounded-full">
                    Retirement Planning
                  </span>
  
                  <p className="mb-1 text-xs text-gray-500">Sep 26, 2024</p>
  
                  <h3 className="font-serif text-lg leading-snug">
                    5 Expenses That Catch Retirees By Surprise
                  </h3>
                </div>
              </div>
  
            </div>
          </div>
  
        </div>
      </section>
    );
  }
  