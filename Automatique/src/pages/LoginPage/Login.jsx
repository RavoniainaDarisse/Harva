import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  return (
    <div className="min-h-screen px-[10%]  flex">
      {/* Section gauche - RESTE FIXE   bg-[#252525]*/}
      <div className="flex-1 flex flex-col  mt-[10%] px-10 text-blue-50">
      <div className="max-w-md">
  <h1 className="text-blue-100 special-font hero-heading">
    redefi<b>n</b>e
  </h1>

  <h1 className="mb-12 text-6xl leading-tight special-font bento-title">
    Simplifie<br />
    Ton <span className="underline decoration-4 decoration-[#e2e681] underline-offset-8">Experience</span>
  </h1>

  <p className="text-base mb-[25%] mt-[20%] pr-10 leading-relaxed text-right text-blue-100 font-robert-regular">
    Rejoignez une plateforme conçue pour<br />
    <span className="text-white">centraliser vos services</span>,<br />
    faciliter vos interactions et<br />
    vous accompagner au quotidien.
  </p>

  <div className="flex items-center gap-3 pt-10">
    <div className="w-15 h-[2px] bg-gray-400"></div>
    <p className="text-sm text-gray-400">
      Vous n’avez pas encore de compte ?
      <Link
        to="/register"
        className="ml-1 text-white transition-colors hover:text-gray-300"
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
          <h2 className="mb-12 text-3xl special-font text-blue-50">Connexion</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className='mb-10'>
              <label className="block mb-5 text-sm special-font text-blue-50">
                Email <span className="text-gray-500">(required)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-0 text-base text-white transition-colors bg-transparent border-b border-gray-600 focus:outline-none focus:border-white"

              />
            </div>
            <div className="relative mb-10">
              <label className="block mb-5 text-sm special-font text-blue-50">
                Mot De Passe <span className="text-gray-500">(required)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 pr-10 text-base text-white transition-colors bg-transparent border-b border-gray-600 focus:outline-none focus:border-white"

                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-gray-500 transition-colors -top-2 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="pt-12">
              <button
                type="submit"
                className="px-12 py-4 text-sm font-semibold tracking-wider text-black transition-colors bg-[#dfdff0] hover:bg-gray-100 "
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;