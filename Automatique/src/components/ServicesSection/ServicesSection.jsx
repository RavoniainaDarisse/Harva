import ScheduleButton from "../ScheduleButton/ScheduleButton";

export default function ServicesSection() {
    return (
      <section className="px-6 py-20 ">
        <div className="mx-auto max-w-7xl">
  
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <p className="mb-4 text-xs tracking-widest text-gray-600 uppercase">
              Our Services
            </p>
  
            <h2 className="mb-6 font-serif leading-tight text-7xl md:text-5xl">
              Five Pathways is here to simplify <br />
              your retirement planning.
            </h2>
  
            <p className="text-sm leading-relaxed text-gray-700">
              We’ll work with you to create a personalized strategy that incorporates
              all of the paths of retirement planning: Income, Taxes, Investments,
              healthcare and <span className="underline">Estate Planning</span>.
            </p>
          </div>
  
          {/* Content */}
          <div className="space-y-28">
  
            {/* Block 1 */}
            <div className="grid items-center grid-cols-1 gap-16 md:grid-cols-2">
              <img
                src="/images/mountain.png"
                alt="Retirement planning"
                className="w-full"
              />
  
              <div>
                <h3 className="mb-4 font-serif text-2xl">
                  Retirement Income Planning
                </h3>
  
                <p className="mb-6 text-sm leading-relaxed text-gray-700">
                  You've got goals. But goals cost money. Make sure you
                  have an income that works for you in retirement.
                  And while we're at it, why not make that income guaranteed?
                  We'll show you how to get the most out of your current
                  assets, pension, and/or Social Security (whatever you
                  might have). We'll also be along for the full ride, helping
                  smooth things out when the road ahead gets a little
                  bumpy. There are no shortcuts on the path to retirement,
                  but we do know all kinds of clever side streets.
                </p>
  
                 <ScheduleButton text='learn more' />
              </div>
            </div>
  
            {/* Block 2 */}
            <div className="grid items-center grid-cols-1 gap-16 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-serif text-2xl">
                  Tax Planning
                </h3>
  
                <p className="mb-6 text-sm leading-relaxed text-gray-700">
                  Your retirement plans may not include the IRS. But rest
                  assured, the IRS has plans for your retirement. Let's work
                  together to make sure you get to keep the money you've
                  earned. We'll show you how to diversify your tax strategy
                  and maximize your retirement benefits. We'll make sure
                  that paying taxes isn't a roadblock on your way to
                  retirement.
                </p>
  
                <ScheduleButton text='learn more' />
              </div>
  
              <img
                src="/images/desert.png"
                alt="Tax planning"
                className="w-full"
              />
            </div>
  
          </div>
        </div>
      </section>
    );
  }
  