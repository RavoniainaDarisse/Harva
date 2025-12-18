// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Shield, User, Upload, Plus, X, ArrowLeft, Save } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"

// export default function ProfilePage() {
//   const { toast } = useToast()

//   const [diplomas, setDiplomas] = useState([])
//   const [certifications, setCertifications] = useState([])
//   const [languages, setLanguages] = useState([])

//   const [newDiploma, setNewDiploma] = useState("")
//   const [newCert, setNewCert] = useState("")
//   const [newLang, setNewLang] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     country: "",
//     level: "",
//     experience: "",
//   })

//   const addItem = (value, setter, current, reset) => {
//     if (value.trim()) {
//       setter([...current, value.trim()])
//       reset()
//     }
//   }

//   const removeItem = (index, setter, current) => {
//     setter(current.filter((_, i) => i !== index))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const response = await fetch("/api/profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           diplomas,
//           certifications,
//           languages,
//         }),
//       })

//       if (!response.ok) throw new Error("Erreur")

//       toast({
//         title: "Profil enregistré !",
//         description: "Ton profil a été sauvegardé avec succès.",
//       })

//       setTimeout(() => {
//         window.location.href = "/matches"
//       }, 1500)
//     } catch (err) {
//       toast({
//         title: "Erreur",
//         description: "Impossible d'enregistrer le profil.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
//         <div className="container px-4 py-4 mx-auto">
//           <div className="flex items-center justify-between">
//             <a href="/" className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-1">
//                 <Shield className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h1 className="text-lg font-bold">Bourse-Guard</h1>
//                 <p className="text-xs text-muted-foreground">Profil</p>
//               </div>
//             </a>

//             <Button variant="outline" size="sm" asChild>
//               <a href="/">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Retour
//               </a>
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="container px-4 py-12 mx-auto">
//         <div className="max-w-3xl mx-auto">
//           {/* Title */}
//           <motion.div
//             className="mb-8 text-center"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-card">
//               <User className="w-5 h-5 text-primary" />
//               <span className="font-medium">Mon profil académique</span>
//             </div>
//             <h2 className="mb-3 text-3xl font-bold md:text-4xl">
//               Complète ton profil
//             </h2>
//             <p className="text-lg text-muted-foreground">
//               Plus ton profil est complet, meilleurs seront tes matches
//             </p>
//           </motion.div>

//           <Card className="p-6 md:p-8">
//             <form className="space-y-8" onSubmit={handleSubmit}>
//               {/* --- LE RESTE DU JSX EST STRICTEMENT IDENTIQUE --- */}

//               {/* Submit */}
//               <div className="flex gap-3">
//                 <Button type="submit" className="flex-1" size="lg" disabled={isSubmitting}>
//                   {isSubmitting ? (
//                     <>
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                       >
//                         <Save className="w-5 h-5 mr-2" />
//                       </motion.div>
//                       Enregistrement...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="w-5 h-5 mr-2" />
//                       Sauvegarder le profil
//                     </>
//                   )}
//                 </Button>

//                 <Button variant="outline" size="lg" asChild>
//                   <a href="/matches">Voir mes matches</a>
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }



// src/pages/ProfilePage.jsx
import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, User, Upload, Plus, X, ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"

export default function ProfilePage() {
  const { toast } = useToast()

  const [diplomas, setDiplomas] = useState([])
  const [certifications, setCertifications] = useState([])
  const [languages, setLanguages] = useState([])

  const [newDiploma, setNewDiploma] = useState("")
  const [newCert, setNewCert] = useState("")
  const [newLang, setNewLang] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    level: "",
    experience: "",
  })

  const addItem = (value, setter, list, reset) => {
    if (!value.trim()) return
    setter([...list, value.trim()])
    reset("")
  }

  const removeItem = (index, setter, list) => {
    setter(list.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          diplomas,
          certifications,
          languages,
        }),
      })

      if (!res.ok) throw new Error()

      toast({
        title: "Profil enregistré",
        description: "Ton profil a été sauvegardé avec succès",
      })

      setTimeout(() => {
        window.location.href = "/matches"
      }, 1500)
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le profil",
        variant: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <a href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold">Bourse-Guard</h1>
              <p className="text-xs text-muted">Profil</p>
            </div>
          </a>
          <Link to="/">
          <Button variant="outline">
          
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          </Link>

        </div>
      </header>

      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full">
              <User className="w-5 h-5 text-primary" />
              <span>Mon profil académique</span>
            </div>
            <h2 className="mb-2 text-3xl font-bold">
              Complète ton profil
            </h2>
            <p className="text-muted">
              Un profil complet améliore les résultats
            </p>
          </motion.div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* INFOS */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Nom complet</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Pays</Label>
                <Input
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Niveau d’étude</Label>
                <Select
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                  options={[
                    "Licence",
                    "Master",
                    "Doctorat",
                  ]}
                />
              </div>

              <div>
                <Label>Expérience</Label>
                <Textarea
                  rows={4}
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
              </div>

              {/* LISTES */}
              {[
                ["Diplômes", newDiploma, setNewDiploma, diplomas, setDiplomas],
                ["Certifications", newCert, setNewCert, certifications, setCertifications],
                ["Langues", newLang, setNewLang, languages, setLanguages],
              ].map(([title, value, setValue, list, setList]) => (
                <div key={title}>
                  <Label>{title}</Label>
                  <div className="flex gap-2">
                    <Input value={value} onChange={(e) => setValue(e.target.value)} />
                    <Button
                      type="button"
                      onClick={() => addItem(value, setList, list, setValue)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <ul className="mt-2 space-y-2">
                    {list.map((item, i) => (
                      <li key={i} className="flex justify-between p-2 border rounded">
                        {item}
                        <button
                          type="button"
                          onClick={() => removeItem(i, setList, list)}
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* SUBMIT */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Enregistrement..." : "Sauvegarder le profil"}
                <Save className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
