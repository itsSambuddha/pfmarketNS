"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock,
  Smartphone,
  CheckCircle2,
  Copy,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const UPI_VPA = "sidhusamskoksbi@oksbi"
const PAYEE_NAME = "ShwetVeer Vrish"
const WHATSAPP_PHONE = "918837405788"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceTitle: string
  finalPrice: number
  isDiscounted: boolean
}

type StoredUser = {
  name: string
  email: string
  phone: string
}

export function BookingDialog({
  open,
  onOpenChange,
  serviceTitle,
  finalPrice,
  isDiscounted,
}: BookingDialogProps) {
  const [step, setStep] = React.useState<"form" | "payment">("form")
  const [formData, setFormData] = React.useState<StoredUser>({
    name: "",
    email: "",
    phone: "",
  })
  const [txnId, setTxnId] = React.useState("")
  const [isCopied, setIsCopied] = React.useState(false)

  // On open: reset to Step 1 and prefill from localStorage if present
  React.useEffect(() => {
    if (!open) return
    setStep("form")
    setTxnId("")
    try {
      const raw = localStorage.getItem("pfmarket-user")
      if (raw) {
        const parsed = JSON.parse(raw) as StoredUser
        setFormData({
          name: parsed?.name ?? "",
          email: parsed?.email ?? "",
          phone: parsed?.phone ?? "",
        })
      } else {
        setFormData({ name: "", email: "", phone: "" })
      }
    } catch {
      setFormData({ name: "", email: "", phone: "" })
    }
  }, [open])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setFormData((prev) => ({ ...prev, phone: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.")
      return
    }
    localStorage.setItem("pfmarket-user", JSON.stringify(formData))
    setStep("payment")
  }

  const handleCopyVpa = () => {
    navigator.clipboard.writeText(UPI_VPA)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // QR selection: 1000 = report, 250 = deck, discounted → generic QR
  let qrImageSrc = "/assets/qr_any.png"
  if (!isDiscounted) {
    if (finalPrice === 250) {
      qrImageSrc = "/assets/qr_250.png"
    } else if (finalPrice === 1000) {
      qrImageSrc = "/assets/qr_1000.png"
    }
  }

  const upiLink = `upi://pay?pa=${encodeURIComponent(
    UPI_VPA,
  )}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${finalPrice}&tn=${encodeURIComponent(
    serviceTitle,
  )}`

  const handleWhatsAppRedirect = () => {
    if (txnId.length < 4) return

    let latestUser: StoredUser = formData
    try {
      const raw = localStorage.getItem("pfmarket-user")
      if (raw) {
        const parsed = JSON.parse(raw) as StoredUser
        latestUser = {
          name: parsed?.name || formData.name,
          email: parsed?.email || formData.email,
          phone: parsed?.phone || formData.phone,
        }
      }
    } catch {
      // ignore and use formData
    }

    const message = `PAYMENT VERIFICATION REQUEST
---------------------------
Service: ${serviceTitle}
Amount Paid: ₹${finalPrice}${isDiscounted ? " (Discount Applied)" : ""}
Txn ID (last 4): ${txnId}
---------------------------
Client Details
Name: ${latestUser.name || "N/A"}
Phone: +91 ${latestUser.phone || "N/A"}
Email: ${latestUser.email || "N/A"}

Attached is my payment screenshot.`

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      message,
    )}`

    window.open(url, "_blank")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] overflow-hidden border border-white/15 bg-background/95 backdrop-blur-2xl p-0">
        <div className="border-b border-white/10 bg-gradient-to-r from-blue-600/15 via-slate-900/70 to-sky-500/15 px-6 py-4">
          <DialogHeader className="mb-0">
            <DialogTitle className="flex items-center justify-between gap-3 text-base">
              <span className="inline-flex items-center gap-2 text-primary">
                <Lock className="h-4 w-4" />
                <span>Secure booking</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-xs text-primary">
                  ₹{finalPrice}
                </span>
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                {serviceTitle}
              </span>
            </DialogTitle>
            <DialogDescription className="mt-1 text-[11px] text-muted-foreground">
              Two quick steps: confirm your contact details, then pay via UPI
              and verify on WhatsApp.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22 }}
                className="grid gap-4"
                onSubmit={handleFormSubmit}
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="h-px w-6 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                  Step 1 · Client details
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="John Doe"
                    className="border border-white/15 bg-white/5 backdrop-blur"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">WhatsApp number</Label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 border-r border-border pr-2 text-sm font-medium text-muted-foreground">
                      +91
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="9999999999"
                      className="border border-white/15 bg-white/5 pl-14 tracking-widest backdrop-blur"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="student@college.edu"
                    className="border border-white/15 bg-white/5 backdrop-blur"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-2 h-11 w-full rounded-full bg-primary text-primary-foreground shadow-lg shadow-blue-500/30 hover:bg-primary/90"
                >
                  Proceed to payment
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-6 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                    Step 2 · UPI payment & verify
                  </div>
                  <button
                    type="button"
                    className="text-[10px] font-medium text-primary underline-offset-2 hover:underline"
                    onClick={() => setStep("form")}
                  >
                    Edit details
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/5 p-4 shadow-inner backdrop-blur-xl dark:bg-slate-950/60">
                  <div className="relative mb-4 flex h-44 w-44 items-center justify-center overflow-hidden rounded-xl border border-gray-200/60 bg-gray-50">
                    <img
                      src={qrImageSrc}
                      alt={`QR for ₹${finalPrice}`}
                      className="h-full w-full object-cover mix-blend-multiply"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        e.currentTarget.parentElement!.innerHTML =
                          "<span class='px-4 text-center text-[11px] text-muted-foreground'>Add a QR image in <code>public/assets</code></span>"
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="mb-2 w-full gap-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href={upiLink}>
                      <Smartphone className="h-4 w-4" />
                      Tap to pay ₹{finalPrice}
                    </a>
                  </Button>
                  <div className="mt-1 flex items-center justify-between gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span className="truncate">{UPI_VPA}</span>
                    <button
                      type="button"
                      onClick={handleCopyVpa}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:text-primary/80"
                    >
                      {isCopied ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      Copy
                    </button>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-white/15 bg-background/70 p-4 backdrop-blur-xl">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 text-amber-400" />
                    <p className="text-xs text-muted-foreground">
                      After paying, paste the last 4 characters of your UTR /
                      transaction ID and tap verify on WhatsApp for instant
                      confirmation.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="txn"
                      className="pl-1 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Transaction ID (last 4)
                    </Label>
                    <Input
                      id="txn"
                      placeholder="e.g. 4F2A"
                      value={txnId}
                      onChange={(e) => setTxnId(e.target.value)}
                      className="border-primary/40 bg-white/5 text-center font-mono tracking-widest backdrop-blur"
                    />
                  </div>

                  <Button
                    onClick={handleWhatsAppRedirect}
                    disabled={txnId.length < 4}
                    className="mt-2 h-11 w-full rounded-full bg-[#25D366] text-white shadow-md shadow-emerald-500/40 hover:bg-[#128C7E] disabled:opacity-50"
                  >
                    Verify on WhatsApp
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
