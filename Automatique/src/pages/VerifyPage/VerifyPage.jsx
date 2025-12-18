import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Search,
  Upload,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom"

export default function VerifyPage() {
  const [inputType, setInputType] = useState("url")
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [error, setError] = useState(null)

  const handleVerify = async () => {
    if (!inputValue.trim()) {
      setError("Veuillez entrer une URL ou du texte")
      return
    }

    setIsLoading(true)
    setResult(null)
    setError(null)
    setQuizAnswered(false)

    try {
      // MOCK RESULT (à remplacer par ton API)
      setTimeout(() => {
        setResult({
          score: 87,
          status: "safe",
          reasons: [
            "Source officielle détectée",
            "Aucune demande de frais",
            "Lien vérifié",
          ],
          officialLink: "https://example.com",
        })
        setIsLoading(false)
      }, 1500)
    } catch {
      setError("Erreur lors de la vérification")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="border-b bg-card">
        <div className="container flex justify-between px-4 py-4 mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
              <Shield className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold">Bourse-Guard</h1>
              <p className="text-xs text-muted-foreground">Vérification</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-12 mx-auto">
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Vérifie une bourse</h2>
          <p className="text-muted-foreground">
            Colle une URL ou un texte
          </p>
        </motion.div>

        {/* INPUT */}
        <Card className="p-6 mb-8">
          {inputType === "url" && (
            <Input
              placeholder="https://example.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}

          {inputType === "text" && (
            <Textarea
              rows={5}
              placeholder="Colle le texte ici"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}

          {error && (
            <div className="mt-4 text-sm text-destructive">{error}</div>
          )}

          <Button className="w-full mt-4" onClick={handleVerify} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Analyse...
              </>
            ) : (
              <>
                <Search className="mr-2" />
                Vérifier
              </>
            )}
          </Button>
        </Card>

        {/* RESULT */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-8 border-2 border-primary/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-success" />
                    <h3 className="text-xl font-bold">Bourse légitime</h3>
                  </div>
                  <div className="text-4xl font-bold text-primary">
                    <CountUp end={result.score} />%
                  </div>
                </div>

                <Progress value={result.score} className="mb-6" />

                <div className="space-y-2">
                  {result.reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      {r}
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6" asChild>
                  <a href={result.officialLink} target="_blank">
                    Source officielle
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

/* COUNT UP */
function CountUp({ end }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const step = end / 40
    const interval = setInterval(() => {
      current += step
      if (current >= end) {
        setCount(end)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(interval)
  }, [end])

  return <span>{count}</span>
}
