// app/samples/[tierId]/page.tsx
import { notFound } from "next/navigation"
import { SERVICE_TIERS } from "@/lib/constants"
import SamplesPageClient from "./SamplesPageClient"

type SamplesPageProps = {
  params: Promise<{ tierId: string }>
}

export default async function SamplesPage(props: SamplesPageProps) {
  const { tierId } = await props.params
  const tier = SERVICE_TIERS.find((t) => t.id === tierId)

  if (!tier) return notFound()

  return (
    <SamplesPageClient
      tierId={tier.id}
      title={tier.title}
      description={tier.subtitle}
      pptVariants={tier.pptVariants ?? []}
      writeupPdfPath={tier.writeupPdfPath}
      kind={tier.kind} // "deck" | "report" | "other"
    />
  )
}
