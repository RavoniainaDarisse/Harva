import { ArrowRight } from "lucide-react";
import ScheduleButton from "./ScheduleButton/ScheduleButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe, sendProfileToN8n } from "@/services/profile.service";
import ScheduleSubmit from "./ScheduleButton/ScheduleSubmit";

export default function Hero() {

    const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe()
        console.log(data)
        setUser(data)
      } catch (error) {
        console.error("Erreur récupération utilisateur", error)
      }
    }

    fetchUser()
  }, [])

  const handleSendToN8n = async () => {
    if (!user?.profile_id) return

    setLoading(true)

    try {
      await sendProfileToN8n(user.profile_id)
      navigate("/match")
    } catch (error) {
      console.error("Erreur envoi N8N", error)
      alert("Erreur lors de l’envoi du profil")
    } finally {
      setLoading(false)
    }
  }
    return (
        <section className="relative min-h-screen overflow-hidden ">

            {/* HEADER */}


            {/* HERO CONTENT */}
            <div className="z-10 px-6 pt-12 mx-auto text-center max-w-10xl center md:px-16 md:pt-24">
                <h1 className="font-serif text-4xl leading-tight text-center md:text-8xl text-dark">
                    A retirement roadmap <br className="hidden md:block" />
                    for everyone.
                </h1>

                <p className="max-w-xl mx-auto my-10 mt-6 text-lg font-semibold text-dark/80">
                    Retirement is a journey.
                    Take it with confidence.
                </p>

                <ScheduleSubmit  text={loading ? "Envoi..." : "matches"}
          onClick={handleSendToN8n}  />
            </div>

            {/* ILLUSTRATION BACKGROUND */}
            {/* <div className="absolute bottom-0 left-0 w-full">
        <img
          src="/heroTop.jpg"
          alt="Landscape Illustration"
          className="hidden w-full md:block"
        />

        <img
          src="/herotopMobile.jpg"
          alt="Landscape Mobile"
          className="block w-full md:hidden"
        />
      </div> */}

            <div className="text-center mt-80">
                <p className="mb-6 font-serif text-sm italic">
                    People are talking
                </p>

                <div className="flex flex-wrap items-center justify-center gap-10 text-sm opacity-80">
                    <span>yahoo! finance</span>
                    <span>Nasdaq</span>
                    <span>Aol.</span>
                    <span>GO Banking Rates</span>
                    <span>NewsBreak</span>
                    <span>msn</span>
                    <span>AARP</span>
                    <span>CBS</span>
                </div>
            </div>


        </section>
    );
}
