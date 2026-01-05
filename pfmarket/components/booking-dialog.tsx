"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Smartphone, CheckCircle2, Copy, AlertCircle } from "lucide-react"
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

// CONSTANTS
const UPI_VPA = "sidhusamsk@oksbi" 
const PAYEE_NAME = "ShwetVeer Vrish"
const WHATSAPP_PHONE = "918837405788" 

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceTitle: string
  finalPrice: number
  isDiscounted: boolean
}

export function BookingDialog({ open, onOpenChange, serviceTitle, finalPrice, isDiscounted }: BookingDialogProps) {
  const [step, setStep] = React.useState<"form" | "payment">("form")
  const [formData, setFormData] = React.useState({ name: "", email: "", phone: "" })
  const [txnId, setTxnId] = React.useState("")
  const [isCopied, setIsCopied] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      const saved = localStorage.getItem("pfmarket-user")
      if (saved) setFormData(JSON.parse(saved))
      setStep("form")
      setTxnId("")
    }
  }, [open])

  // Phone Number Logic: Allow only numbers, max 10
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setFormData({ ...formData, phone: value })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.phone.length < 10) {
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

  // QR Selection Logic
  let qrImageSrc = "/assets/qr_any.png" // Default
  if (!isDiscounted && finalPrice === 250) qrImageSrc = "/assets/qr_250.png"
  if (!isDiscounted && finalPrice === 1000) qrImageSrc = "/assets/qr_1000.png"

  // Deep Link
  const upiLink = `upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${finalPrice}&tn=${encodeURIComponent(serviceTitle)}`

  const handleWhatsAppRedirect = () => {
    const message = `*PAYMENT VERIFICATION REQUEST*
---------------------------
*Service:* ${serviceTitle}
*Amount Paid:* ₹${finalPrice} ${isDiscounted ? '(Discount Applied)' : ''}
*Txn ID:* ${txnId}
---------------------------
*Client Details:*
Name: ${formData.name}
Phone: +91 ${formData.phone}
Email: ${formData.email}

_Attached is my payment screenshot._`

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] overflow-hidden border-primary/20 bg-background/95 backdrop-blur-xl p-0">
        <div className="p-6">
            <DialogHeader className="mb-4">
            <DialogTitle className="flex items-center gap-2 text-xl text-primary">
                {step === "form" ? "Client Details" : "Secure Transfer"}
            </DialogTitle>
            <DialogDescription>
                {step === "form" 
                ? `Booking: ${serviceTitle} @ ₹${finalPrice}` 
                : "Scan QR or use UPI App to complete transfer."}
            </DialogDescription>
            </DialogHeader>

            <AnimatePresence mode="wait">
            {step === "form" ? (
                <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid gap-4"
                onSubmit={handleFormSubmit}
                >
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                    id="name"
                    required
                    placeholder="John Doe"
                    className="bg-secondary/20"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">WhatsApp Number</Label>
                    <div className="relative flex items-center">
                        <span className="absolute left-3 text-muted-foreground text-sm font-medium pr-2 border-r border-border">+91</span>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            placeholder="9999999999"
                            className="bg-secondary/20 pl-14 tracking-widest"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                    id="email"
                    type="email"
                    required
                    placeholder="student@college.edu"
                    className="bg-secondary/20"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <Button type="submit" className="w-full mt-4 bg-primary hover:bg-primary/90">
                    Proceed to Payment
                </Button>
                </motion.form>
            ) : (
                <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
                >
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border-2 border-primary/10 shadow-inner">
                    <div className="relative w-48 h-48 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center mb-4 border border-gray-100">
                        <img 
                            src={qrImageSrc} 
                            alt={`QR for ₹${finalPrice}`} 
                            className="object-cover w-full h-full mix-blend-multiply"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerText = "Add QR in /public/assets/";
                            }}
                        />
                    </div>

                    <Button variant="outline" className="w-full gap-2 mb-2 border-primary/20 text-primary hover:bg-primary/5" asChild>
                        <a href={upiLink}>
                        <Smartphone className="w-4 h-4" /> Tap to Pay ₹{finalPrice}
                        </a>
                    </Button>
                    
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                        <span>{UPI_VPA}</span>
                        <button onClick={handleCopyVpa} className="hover:text-primary transition-colors">
                        {isCopied ? <CheckCircle2 className="w-3 h-3 text-green-500"/> : <Copy className="w-3 h-3"/>}
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="space-y-1">
                    <Label htmlFor="txn" className="text-xs uppercase tracking-wider text-muted-foreground font-bold pl-1">
                        Transaction ID (Required)
                    </Label>
                    <Input 
                        id="txn" 
                        placeholder="Enter UTR / Last 4 Digits"
                        value={txnId}
                        onChange={(e) => setTxnId(e.target.value)}
                        className="text-center font-mono tracking-widest border-primary/30 focus-visible:ring-primary"
                    />
                    </div>

                    <Button 
                    onClick={handleWhatsAppRedirect}
                    disabled={txnId.length < 4}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-12 text-base shadow-md disabled:opacity-50"
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