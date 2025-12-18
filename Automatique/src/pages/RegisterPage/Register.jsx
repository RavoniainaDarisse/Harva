import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
const Register = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [role, setRole] = useState(null); // Ajout du rôle nullable
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    document: '',
    contact: '',
    specialite: '',
    habitation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);
  };

  return (
    <div className="min-h-screen px-[10%] bg-[#252525] text-blue-50 flex">
      {/* Section gauche - RESTE FIXE */}
      <div className="flex-1 flex flex-col mt-[10%] px-10 text-blue-50">
  <div className="max-w-md">
    <h1 className="text-blue-100 special-font hero-heading">
      redefi<b>n</b>e
    </h1>

    <h1 className="mb-12 text-6xl leading-tight special-font bento-title">
      Connecte<br />
      Ton <span className="underline decoration-4 decoration-[#e2e681] underline-offset-8">Univers</span>
    </h1>

    <p className="text-base mb-[25%] mt-[20%] pr-10 leading-relaxed text-right text-blue-100 font-robert-regular">
      Rejoignez une plateforme pensée pour<br />
      <span className="text-blue-50">simplifier vos échanges</span>,<br />
      centraliser vos outils et<br />
      améliorer votre expérience numérique.
    </p>

    <div className="flex items-center gap-3 pt-10">
      <div className="w-15 h-[2px] bg-gray-400"></div>
      <p className="text-sm text-gray-400">
        Vous avez déjà un compte ?
        <Link
          to="/login"
          className="ml-1 transition-colors text-blue-50 hover:text-gray-300"
        >
          Connectez-vous
        </Link>
      </p>
    </div>
  </div>
</div>



      {/* Section droite - Formulaire AVEC CARROUSEL */}
      <div className="flex items-center justify-center flex-1 px-20 mt-12">
        <div className="w-full max-w-md special-font">
          <h2 className="mb-12 text-3xl special-font text-blue-50">
            Inscription {currentStep === 2 && "- Étape 2"}
          </h2>

          {/* ÉTAPE 1 */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-8">
              <div className='flex gap-4 mb-10'>
                <div className='w-[50%]'>
                  <label className="block mb-3 text-sm text-blue-50">
                    Nom <span className="text-gray-500">(required)</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                    placeholder=""
                  />
                </div>

                <div className='w-[50%]'>
                  <label className="block mb-3 text-sm text-blue-50">
                    Prénom <span className="text-gray-500">(required)</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                    placeholder=""
                  />
                </div>
              </div>

              <div className='mb-10'>
                <label className="block mb-3 text-sm text-blue-50">
                  Email <span className="text-gray-500">(required)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                  placeholder=""
                />
              </div>

              <div className="relative mb-10">
                <label className="block mb-3 text-sm text-blue-50">
                  Mot De Passe <span className="text-gray-500">(required)</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 pr-10 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                    placeholder=""
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 text-gray-500 transition-colors -top-2 hover:text-blue-50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Choix du rôle */}
              <div className="flex items-center gap-8 mb-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={role === 'medecin'}
                    onChange={() => setRole(role === 'medecin' ? null : 'medecin')}
                    className="accent-[#FEFE90]"
                  />
                  <span className="text-blue-50">Médecin</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={role === 'inspecteur'}
                    onChange={() => setRole(role === 'inspecteur' ? null : 'inspecteur')}
                    className="accent-[#FEFE90]"
                  />
                  <span className="text-blue-50">Inspecteur</span>
                </label>
              </div>

              {/* Bloc spécialité/lieux seulement si Médecin */}
              {role === 'medecin' && (
                <div className='flex gap-4 mb-10'>
                  <div className='w-[50%]'>
                    <label className="block mb-3 text-sm text-blue-50">
                      Specialite <span className="text-gray-500">(required)</span>
                    </label>
                    <input
                      type="text"
                      name="specialite"
                      value={formData.specialite}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                      placeholder=""
                    />
                  </div>

                  <div className='w-[50%]'>
                    <label className="block mb-3 text-sm text-blue-50">
                      Lieux <span className="text-gray-500">(required)</span>
                    </label>
                    <input
                      type="text"
                      name="habitation"
                      value={formData.habitation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                      placeholder=""
                    />
                  </div>
                </div>
              )}

              <div className="pt-12">
                <button
                  type="submit"
                  className="px-12 py-4 text-sm font-semibold tracking-wider text-black transition-colors bg-[#dfdff0] hover:bg-gray-100"
                >
                  SUIVANT
                </button>
              </div>
            </form>
          )}

          {/* ÉTAPE 2 */}
          {currentStep === 2 && (
            <form onSubmit={handleSubmit} className="space-y-8">

              <div className="mb-10">
                <label className="block mb-3 text-sm text-blue-50">
                  Confirmation Mot De Passe <span className="text-gray-500">(required)</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 pr-10 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                    placeholder=""
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 text-gray-500 transition-colors -top-2 hover:text-blue-50"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='mb-5'>
                  <label className="block mb-3 text-sm text-blue-50">
                    Document <span className="text-gray-500">(required)</span>
                  </label>
                  <input
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                    placeholder=""
                  />
                </div>

                <div className='mb-5'>
                  <label className="block mb-3 text-sm text-blue-50">
                    Contact <span className="text-gray-500">(required)</span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 text-base transition-colors bg-transparent border-b border-gray-600 text-blue-50 focus:outline-none focus:border-white"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-12">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-8 py-4 text-sm font-semibold tracking-wider transition-colors bg-gray-600 text-blue-50 hover:bg-gray-700"
                >
                  RETOUR
                </button>
                <button
                  type="submit"
                  className="px-12 py-4 text-sm font-semibold tracking-wider text-black transition-colors bg-[#dfdff0] hover:bg-gray-100"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;