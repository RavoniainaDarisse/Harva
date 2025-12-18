import { useState } from "react";

export default function JourneysExact() {
  const journeys = [
    {
      text: `Five Pathways has one of the absolute best customer service teams that I have experienced in a very long time. I have experienced a greedy salesman in the past when I didn't have the knowledge to realize it. Five Pathways is very helpful, thorough, honest, and sincerely tries to help potential clients, but not just to make a sale. They have the highest integrity and is sincerely interested in helping the client "see it like it is".`,
      author: "Diana H."
    },
    {
      text: `We have been working with Five Pathways for several years now. They are very knowledgeable, patient, and always take the time to explain options in a way that makes sense. We feel confident and supported in our retirement journey.`,
      author: "Judy M."
    },
    {
      text: `They helped us understand the best financial fit for our situation and walked us through every step. Five Pathways truly cares about the people they serve.`,
      author: "Robert S."
    }
  ];

  const [index, setIndex] = useState(0);
  const prev = () =>
    setIndex(index === 0 ? journeys.length - 1 : index - 1);
  const next = () =>
    setIndex(index === journeys.length - 1 ? 0 : index + 1);

  const left = journeys[(index - 1 + journeys.length) % journeys.length];
  const right = journeys[(index + 1) % journeys.length];

  return (
    <section className="relative overflow-hidden py-28 ">

      {/* TITLE */}
      <p className="mb-24 font-serif text-sm italic text-center">
        Journeys from the Past
      </p>

      {/* SLIDER ROW */}
      <div className="relative flex items-center justify-center">

        {/* LEFT CUT CARD */}
        <div className="absolute -left-[300px] w-[520px]  border border-black rounded-xl px-16 py-14 opacity-50 hidden lg:block">
          <span className="absolute font-serif text-5xl top-8 left-8">“</span>
          <p className="mt-14 font-serif text-[13px] leading-[26px]">
            {left.text}
          </p>
        </div>

        {/* ARROW LEFT */}
        <button
          onClick={prev}
          className="absolute left-[22%] text-3xl font-serif hover:opacity-60 hidden lg:block"
        >
          ←
        </button>

        {/* MAIN CARD */}
        <div className="relative w-[720px]  border border-black rounded-xl px-20 py-16 z-10">

          {/* QUOTE */}
          <span className="absolute font-serif text-5xl top-10 left-12">“</span>

          {/* TEXT */}
          <p className="mt-14 font-serif text-[14px] leading-[28px] text-justify">
            {journeys[index].text}
          </p>

          {/* SIGNATURE */}
          <p className="mt-10 font-serif text-2xl italic">
            {journeys[index].author}
          </p>

          {/* LINE */}
          <div className="w-full h-px mt-6 bg-black" />

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-3 mt-4 font-serif text-xs">
            ★★★★★ <span className="text-[10px]">5-Star Verified Review</span>
          </div>
        </div>

        {/* ARROW RIGHT */}
        <button
          onClick={next}
          className="absolute right-[22%] text-3xl font-serif hover:opacity-60 hidden lg:block"
        >
          →
        </button>

        {/* RIGHT CUT CARD */}
        <div className="absolute -right-[300px] w-[520px]  border border-black rounded-xl px-16 py-14 opacity-50 hidden lg:block">
          <span className="absolute font-serif text-5xl top-8 left-8">“</span>
          <p className="mt-14 font-serif text-[13px] leading-[26px]">
            {right.text}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-24">
        <button className="relative">
          <span className="absolute inset-0 bg-black rounded-full translate-x-[3px] translate-y-[3px]" />
          <span className="relative px-7 py-3 bg-[#6ED3C2] border-2 border-black rounded-full font-serif flex gap-3 items-center">
            More journeys →
          </span>
        </button>
      </div>
    </section>
  );
}
