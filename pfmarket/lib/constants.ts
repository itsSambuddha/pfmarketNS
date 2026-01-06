export type TierPptVariant = {
  id: string
  label: string
  description?: string
  embedUrl: string
}

export type ServiceTier = {
  id: string
  title: string
  subtitle: string
  price: string
  unit: string
  features: string[]
  pptEmbedUrl?: string
  writeupPdfPath?: string
  pptVariants?: TierPptVariant[]
  recommended?: boolean
  gradient: string
  kind: "deck" | "report" | "other"
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "deck",
    kind: "deck",
    title: "Cinematic Deck",
    subtitle: "High-impact presentations for investors & professors.",
    price: "₹250",
    unit: "per 10 slides",
    features: [
      "Custom Typography & Layouts",
      "Motion-Ready Transitions",
      "Data Visualization (Charts/Graphs)",
      "Source Files Included",
      "10-14 Days Turnaround",
    ],
    pptVariants: [
      {
        id: "investor",
        label: "SEC-NEXUS PROJECT PPT",
        description: "This was the ppt used in my 5th semester major project.",
        embedUrl:
          "https://1drv.ms/p/c/590f26d681bb30df/IQR3jPlWC3KEQ7sbYm1gWux9AQ_MBxGdbNHfxEUjSG6fk2o?wdAr=1.7777777777777777&wdEaaCheck=1",
      },
      {
        id: "academic",
        label: "Academic Viva",
        description: "Exam-safe defense deck with citations and methodology.",
        embedUrl:
          "https://1drv.ms/p/c/your-academic-deck-embed-id?wdAr=1.7777777777777777&wdEaaCheck=1",
      },
      {
        id: "conference",
        label: "Conference Keynote",
        description: "Story-driven talk with motion-heavy hero slides.",
        embedUrl:
          "https://1drv.ms/p/c/your-conference-deck-embed-id?wdAr=1.7777777777777777&wdEaaCheck=1",
      },
    ],
    writeupPdfPath: "/samples/deck-writeup.pdf",
    recommended: true,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "report",
    kind: "report",
    title: "The Architect's Report",
    subtitle: "Structuring chaos into academic precision.",
    price: "₹1,000",
    unit: "per project",
    features: [
      "Plagiarism Check & Fixes",
      "IEEE/APA/MLA Formatting",
      "Table of Contents Automation",
      "Cover Page Design",
      "Infinite Revisions",
    ],
    // just PDFs for this tier
    writeupPdfPath: "/samples/SEC-NEXUS-Project-Report.pdf",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    id: "shield",
    kind: "other",
    title: "Refund Shield",
    subtitle: "Our commitment to risk-free excellence.",
    price: "Free",
    unit: "included",
    features: [
      "100% Money-Back Guarantee",
      "Escrow-style Payment (Optional)",
      "Strict Confidentiality NDA",
      "Clear Acceptance Criteria",
    ],
    gradient: "from-emerald-500 to-green-400",
  },
]
