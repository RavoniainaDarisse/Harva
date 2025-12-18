import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, User, Plus, X, ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"


import { useToast } from "@/hooks/use-toast"
import { Link, useNavigate } from "react-router-dom"
import { saveProfile } from "@/services/profile.service"

export default function ProfilePage() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null) // "success" | "error"


  const [autresLangues, setAutresLangues] = useState([])
  const [recompenses, setRecompenses] = useState([])
  const [newLangue, setNewLangue] = useState("")
  const [newRecompense, setNewRecompense] = useState("")

  const [formData, setFormData] = useState({
    telephone: "",
    sexe: "",
    nationalite: "",
    ville_residence: "",
    parcours_academique: "",
    niveau_etude_actuel: "",
    domaine_etude: "",
    etablissement_actuel: "",
    moyenne_generale: "",
    annee_diplome_prevue: "",
    langue: "",
    niveau_francais: "",
    niveau_anglais: "",
    date_naissance: "",
    experiences_academiques: "",
    activites_extrascolaires: "",
    engagement_associatif: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await saveProfile({
        ...formData,
        autres_langues: autresLangues,
        recompenses_distinctions: recompenses,
      })
      
      setSaveStatus("success")
      setOpenDialog(true)

      toast({
        title: "Profil enregistré",
        description: "Ton profil a été sauvegardé avec succès",
      })

      // setTimeout(() => navigate("/matches"), 1500)
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le profil",
        variant: "destructive",
      })

      setSaveStatus("error")
    setOpenDialog(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf5]">

<Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle className="text-xl">
        {saveStatus === "success"
          ? "Profil enregistré ✅"
          : "Erreur ❌"}
      </DialogTitle>

      <DialogDescription className="pt-2">
        {saveStatus === "success"
          ? "Ton profil a été enregistré avec succès."
          : "Une erreur est survenue lors de l'enregistrement du profil."}
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="flex justify-end gap-2">
      {saveStatus === "success" && (
        <Button onClick={() => navigate("/match")}>
          Continuer
        </Button>
      )}

      <Button
        variant="outline"
        onClick={() => setOpenDialog(false)}
      >
        Fermer
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-[#fffaf5]">
        <div className="w-full flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold">Bourse-Guard</h1>
              <p className="text-xs text-muted-foreground">Profil académique</p>
            </div>
          </Link>

          <Button variant="outline" className="bg-[#fffaf5]" size="sm" asChild>
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </a>
          </Button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="w-full  px-6 py-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full space-y-16"
        >
          {/* SECTION 1 */}
          <section>
            <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Informations personnelles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <Field label="Téléphone">
                <Input />
              </Field>

              <Field label="Sexe">
                <Select >
                  <SelectTrigger className="h-14">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#fffaf5]">
                    <SelectItem value="M">Masculin</SelectItem>
                    <SelectItem value="F">Féminin</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Nationalité">
                <Input />
              </Field>

              <Field label="Ville de résidence">
                <Input />
              </Field>

              <Field label="Date de naissance">
                <Input type="date" />
              </Field>
            </div>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">
              Parcours académique
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <Field label="Parcours académique">
                <Input />
              </Field>

              <Field label="Niveau d’étude">
                <Select>
                  <SelectTrigger className="h-14">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#fffaf5]">
                    <SelectItem value="Licence">Licence</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="Doctorat">Doctorat</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Domaine d’étude">
                <Input />
              </Field>

              <Field label="Établissement actuel">
                <Input />
              </Field>

              <Field label="Moyenne générale">
                <Input />
              </Field>

              <Field label="Année diplôme prévue">
                <Input type="number" />
              </Field>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <TextareaBlock label="Expériences académiques" />
            <TextareaBlock label="Activités extrascolaires" />
            <TextareaBlock label="Engagement associatif" />
          </section>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="h-12 px-10">
              Sauvegarder
              <Save className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}

/* UI helpers */
function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function TextareaBlock({ label }) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea rows={6} />
    </div>
  )
}
