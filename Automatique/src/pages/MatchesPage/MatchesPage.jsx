import { motion } from "framer-motion"
import {
  Shield,
  ArrowLeft,
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom"

const mockScholarships = [
  {
    name: "Chevening Scholarship (UK)",
    match: 95,
    amount: "Full tuition + living expenses",
    deadline: "5 Novembre 2025",
    location: "Royaume-Uni",
    level: "Master",
    description:
      "Bourses prestigieuses du gouvernement britannique pour futurs leaders mondiaux.",
    url: "https://www.chevening.org",
  },
  {
    name: "Erasmus Mundus Joint Masters",
    match: 88,
    amount: "€25,000 - €48,000",
    deadline: "15 Janvier 2026",
    location: "Europe (plusieurs pays)",
    level: "Master",
    description:
      "Programme d'excellence de l'UE avec mobilité entre plusieurs universités européennes.",
    url: "https://erasmus-plus.ec.europa.eu",
  },
  {
    name: "MasterCard Foundation Scholars",
    match: 82,
    amount: "Full funding",
    deadline: "31 Mars 2026",
    location: "Afrique / Amérique du Nord",
    level: "Undergraduate & Master",
    description:
      "Pour étudiants africains prometteurs engagés dans la transformation sociale.",
    url: "https://mastercardfdn.org",
  },
]

export default function MatchesPage() {
  return (
    <div className="min-h-screen font-serif bg-[#fffaf5]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-[#fffaf5] backdrop-blur">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">

          <a href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl to-chart-1">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Bourse-Guard</h1>
              <p className="text-xs text-muted-foreground">Mes matches</p>
            </div>
          </a>

          <Button variant="outline" className="bg-[#fffaf5]" size="sm" asChild>
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </a>
          </Button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-5xl mx-auto">

          {/* TITLE */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full ">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium">Bourses correspondantes</span>
            </div>

            <h2 className="mb-3 text-3xl font-bold font-serif md:text-4xl">
              Tes meilleures opportunités
            </h2>

            <p className="text-lg text-muted-foreground">
              Basé sur ton profil académique
            </p>
          </motion.div>

          {/* LIST */}
          <div className="space-y-6">
            {mockScholarships.map((s, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 transition-all md:p-8 hover:shadow-lg bg-[#fffaf5]">

                  {/* TOP */}
                  <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold font-serif">{s.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {s.description}
                      </p>
                    </div>

                    {/* MATCH */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 + index * 0.1 }}
                      className="flex items-center justify-center w-20 h-20 border-4 rounded-full border-primary/20 bg-primary/10"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {s.match}%
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Match
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <Progress value={s.match} className="h-2 mb-6" />

                  {/* DETAILS */}
                  <div className="grid gap-4 mb-6 sm:grid-cols-2 md:grid-cols-4">
                    <Info icon={DollarSign} label="Montant" value={s.amount} />
                    <Info icon={Calendar} label="Deadline" value={s.deadline} />
                    <Info icon={MapPin} label="Localisation" value={s.location} />
                    <Info icon={GraduationCap} label="Niveau" value={s.level} />
                  </div>

                  {/* CTA */}
                  <Button className="w-full" asChild>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      Voir l'offre officielle
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>

                </Card>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM CTA */}
          <motion.div
            className="p-8 mt-12 text-center border rounded-2xl to-chart-1/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="mb-3 text-xl font-bold">
              Améliore ton profil pour plus de matches
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Ajoute tes certifications, expériences et langues pour découvrir plus d'opportunités
            </p>
            <Button asChild>
  <Link to="/profileAdd">Compléter mon profil</Link>
</Button>

          </motion.div>

        </div>
      </main>
    </div>
  )
}

/* Small helper component */
function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  )
}
