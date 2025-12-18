import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ScheduleButton from "../../components/ScheduleButton/ScheduleButton";
import { register } from "@/services/auth.service";

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = await register(formData)
      console.log('Register success:', data)
      // Après inscription, redirige vers login
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError('Une erreur est survenue lors de l’inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-[10%] text-black flex">

      {/* SECTION GAUCHE (inchangée) */}
      <div className="flex-1 flex flex-col mt-[10%] px-10">
        <div className="max-w-md">
          <h1 className="font-serif text-8xl">HARVA</h1>

          <h2 className="mb-12 font-serif text-6xl leading-tight">
            Connecte <br />
            Ton{" "}
            <span className="underline decoration-4 decoration-[#e2e681] underline-offset-8">
              Univers
            </span>
          </h2>

          <p className="text-base mb-[25%] mt-[20%] pr-10 leading-relaxed text-right">
            Rejoignez une plateforme pensée pour<br />
            simplifier vos échanges,<br />
            centraliser vos outils et<br />
            améliorer votre expérience numérique.
          </p>

          <div className="flex items-center gap-3 pt-10">
            <div className="w-12 h-[2px] bg-gray-400" />
            <p className="text-sm text-gray-700">
              Vous avez déjà un compte ?
              <Link to="/login" className="ml-1 text-black hover:text-gray-400">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION DROITE – FORMULAIRE */}
      <div className="flex items-center justify-center flex-1 px-20 mt-12">
        <div className="w-full max-w-md">

          <h2 className="mb-12 text-3xl">Inscription</h2>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* NOM / PRENOM */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-3 text-sm">
                  Nom <span className="text-gray-500">(required)</span>
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none"
                />
              </div>

              <div className="w-1/2">
                <label className="block mb-3 text-sm">
                  Prénom <span className="text-gray-500">(required)</span>
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-3 text-sm">
                Email <span className="text-gray-500">(required)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none"
              />
            </div>

            {/* MOT DE PASSE */}
            <div>
              <label className="block mb-3 text-sm">
                Mot de passe <span className="text-gray-500">(required)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-10 bg-transparent border-b border-gray-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-gray-500 -top-1 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-12">
            <button className="relative" type="submit" disabled={loading}>
          <span className="absolute inset-0 bg-black rounded-full translate-x-[3px] translate-y-[3px]" />
          <span className="relative px-7 py-3 bg-[#6ED3C2] border-2 border-black rounded-full font-serif flex gap-3 items-center">
            S'inscrire
          </span>
        </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
