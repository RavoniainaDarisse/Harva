import React from "react";
import imagef from "../../assets/img/fleche.png";
import manondro from "../../assets/img/manondro.png";
import Navbar from "../../components/Navbar";

function EducationPage() {
  return (
    <div>
           <Navbar />
    <div className="flex flex-col justify-between min-h-screen px-24 text-white mt-11 bg-neutral-900">
      {/* SECTION VOALOHANY */}
      <div className="flex flex-col items-start justify-between gap-16 pt-16 md:flex-row md:gap-20">
        <div className="flex flex-col w-full gap-2 md:w-2/3">
          <h1 className="text-6xl font-light text-gray-300">ESPACE</h1>
          <h2 className="font-semibold text-yellow-300 text-8xl">EDUCATION</h2>

          <div className="w-full max-w-xl mt-4 aspect-video">
            <iframe
              className="w-9/12 rounded-md h-4/5"
              src="https://www.youtube.com/embed/z3grqSvY4Aw?si=craCGGvK9CW--Rh-"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="w-full mt-64 md:w-1/3">
          <h3
            className="pb-6 text-4xl uppercase border-b"
            style={{
              borderBottom: "2px #454545 solid",
              color: "#BDBDBD",
            }}
          >
            FICHIERS
          </h3>
          <ul className="space-y-4 text-sm md:text-base">
            <li className="py-6 border-b border-[#454545] text-[#BDBDBD] hover:text-yellow-300 hover:border-yellow-300 transition cursor-pointer">
              Hygiène alimentaire
            </li>
            <li className="py-6 border-b border-[#454545] text-[#BDBDBD] hover:text-yellow-300 hover:border-yellow-300 transition cursor-pointer">
              Premiers réflexes en cas d'intoxication
            </li>

          </ul>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-12 mt-24 md:flex-row">
        <div className="flex items-start gap-4">
          <img src={imagef} alt="fleche" className="w-full h-full" />
          <p className="max-w-xs mt-24 text-sm text-gray-300">
            Ta santé commence par de bons gestes simples. Apprends à les connaître pour mieux te protéger, toi et tes proches.
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-5xl font-light text-gray-300">MIEUX PRÉVENIR</h2>
          <h3 className="text-6xl font-semibold text-yellow-300">
            POUR MIEUX VIVRE
          </h3>
        </div>
      </div>

      {/* SECTION FAHAROA */}
      <section className="min-h-screen px-6 pt-40 text-white bg-neutral-900">
        <h2 className="mb-12 text-4xl font-light text-center text-gray-400">DOWNLOADS</h2>

        <div className="grid grid-cols-2 gap-6 mb-12 md:grid-cols-4">
          {/* 8 cartes actives */}
          <div className="w-full h-full px-6 border border-gray-600 rounded-md bg-neutral-800">
            <p className="mt-48 mb-4">Atlas V User’s Guide</p>
            <hr className="border-gray-500" />
            <p className="my-4 text-sm text-gray-400">_PDF</p>
          </div>
          <div className="w-full h-full px-6 border border-gray-600 rounded-md bg-neutral-800">
            <p className="mt-48 mb-4">Atlas V User’s Guide</p>
            <hr className="border-gray-500" />
            <p className="my-4 text-sm text-gray-400">_PDF</p>
          </div>
          <div className="w-full h-full px-6">
          </div>
          <div className="w-full h-full px-6 bg-yellow-600 border border-yellow-300 rounded-md bg-opacity-20">
            <p className="mt-48">ULA Rocket Rundown</p>
            <hr className="border-yellow-300" />
            <p className="mt-2 text-sm text-yellow-200">_PDF</p>
          </div>
          <div className="flex items-center w-full h-full gap-4 px-6">
            <div className="px-20 py-1 mt-5 mr-4 -ml-40 border-8 border-yellow-400">
              <img src={manondro} alt="fleche" className="w-10 h-full ml-10 -mr-10" />
            </div>
            <a href="#" className="mt-3 text-sm text-gray-400 hover:text-amber-500">See all</a>
          </div>
          <div className="w-full h-full px-6">
          </div>
          <div className="w-full h-full px-6 border border-gray-600 rounded-md bg-neutral-800">
            <p className="mt-48 mb-4">Atlas V User’s Guide</p>
            <hr className="border-gray-500" />
            <p className="my-4 text-sm text-gray-400">_PDF</p>
          </div>
          <div className="w-full h-full px-6 border border-gray-600 rounded-md bg-neutral-800">
            <p className="mt-48 mb-4">Atlas V User’s Guide</p>
            <hr className="border-gray-500" />
            <p className="my-4 text-sm text-gray-400">_PDF</p>
          </div>
        </div>
      </section>
    </div >
    </div>
  );
}

export default EducationPage;
