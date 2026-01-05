export type ServiceTier = {
  id: string
  title: string
  subtitle: string
  price: string
  unit: string
  features: string[]
  recommended?: boolean
  gradient: string
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "deck",
    title: "Cinematic Deck",
    subtitle: "High-impact presentations for investors & professors.",
    price: "₹250",
    unit: "per 10 slides",
    features: [
      "Custom Typography & Layouts",
      "Motion-Ready Transitions",
      "Data Visualization (Charts/Graphs)",
      "Source Files Included",
      "48-Hour Turnaround"
    ],
    recommended: true,
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: "report",
    title: "The Architect's Report",
    subtitle: "Structuring chaos into academic precision.",
    price: "₹1,000",
    unit: "per project",
    features: [
      "Plagiarism Check & Fixes",
      "IEEE/APA/MLA Formatting",
      "Table of Contents Automation",
      "Cover Page Design",
      "Infinite Revisions"
    ],
    gradient: "from-violet-500 to-purple-400"
  },
  {
    id: "shield",
    title: "Refund Shield",
    subtitle: "Our commitment to risk-free excellence.",
    price: "Free",
    unit: "included",
    features: [
      "100% Money-Back Guarantee",
      "Escrow-style Payment (Optional)",
      "Strict Confidentiality NDA",
      "Clear Acceptance Criteria"
    ],
    gradient: "from-emerald-500 to-green-400"
  }
]