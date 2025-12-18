import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ScheduleButton from '../../components/ScheduleButton/ScheduleButton';
import { login } from '@/services/auth.service';


const Login = () => {

  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });




  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
  
    try {
      const data = await login(formData.email, formData.password)
      console.log('Login data:', data) // 👈 ajoute ça
      navigate('/match')
    } catch (err) {
      console.log(err)
      setError('Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }
  


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Login data:', formData);
  // };

  return (
    <div className="min-h-screen px-[10%]  flex">
      {/* Section gauche - RESTE FIXE   bg-[#252525]*/}
      <div className="flex-1 flex flex-col  mt-[10%] px-10 text-black">
        <div className="max-w-md">
          <h1 className="font-serif leading-tight text-black text-8xl">
            HARVA
          </h1>

          <h1 className="mb-12 font-serif text-6xl leading-tight">
            Simplifie<br />
            Ton <span className="underline decoration-4 decoration-[#e2e681] underline-offset-8">Experience</span>
          </h1>

          <p className="text-base mb-[25%] mt-[20%] pr-10 leading-relaxed text-right text-black font-serif ">
            Rejoignez une plateforme conçue pour<br />
            <span className="text-black">centraliser vos services</span>,<br />
            faciliter vos interactions et<br />
            vous accompagner au quotidien.
          </p>

          <div className="flex items-center gap-3 pt-10">
            <div className="w-15 h-[2px] bg-gray-400"></div>
            <p className="text-sm text-gray-800">
              Vous n’avez pas encore de compte ?
              <Link
                to="/register"
                className="ml-1 text-black transition-colors hover:text-gray-300"
              >
                Inscrivez-vous ici
              </Link>
            </p>
          </div>
        </div>

      </div>

      {/* Section droite - Formulaire LOGIN UNIQUEMENT */}
      <div className="flex items-center justify-center flex-1 px-20 mt-12">
        <div className="w-full max-w-md">
          <h2 className="mb-12 text-3xl text-black special-font">Connexion</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className='mb-10'>
              <label className="block mb-5 text-sm text-black special-font">
                Email <span className="text-black">(required)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-0 text-base text-black transition-colors bg-transparent border-b border-gray-600 focus:outline-none focus:border-white"

              />
            </div>
            <div className="relative mb-10">
              <label className="block mb-5 text-sm text-black special-font">
                Mot De Passe <span className="text-black">(required)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 pr-10 text-base text-black transition-colors bg-transparent border-b border-gray-600 focus:outline-none focus:border-white"

                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-black transition-colors -top-2 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="pt-12">
              {/* <button type="submit" disabled={loading}>
                <ScheduleButton text={loading ? 'Connexion...' : 'Se connecter'} />
              </button> */}

              <button className="relative" type="submit" disabled={loading}>
          <span className="absolute inset-0 bg-black rounded-full translate-x-[3px] translate-y-[3px]" />
          <span className="relative px-7 py-3 bg-[#6ED3C2] border-2 border-black rounded-full font-serif flex gap-3 items-center">
            Se connectez
          </span>
        </button>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}


            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;