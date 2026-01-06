// app/terms/page.tsx
import Link from "next/link"

export default function TermsPage() {
  return (
    <main className="relative mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Terms of service
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page explains how this one‑person service works, what you can
          expect, and what you agree to when you book a project.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground">
            1. Who you are working with
          </h2>
          <p className="mt-2">
            This is a solo, independent service. There is no separate company or
            agency behind the site—when you book a project, you are working
            directly with the person who will design your deck or structure your
            report, i.e. Sam
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            2. Scope of services
          </h2>
          <p className="mt-2">
            The service focuses on presentation design, report structuring, and
            related formatting and storytelling help. Exact deliverables,
            timelines, and fees are discussed and agreed with you individually
            (usually over WhatsApp or similar) before work starts.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            3. No academic dishonesty
          </h2>
          <p className="mt-2">
            You are responsible for how you use any deck, report, or material
            delivered. This service is meant to help you present your own work
            better, not to sit an exam for you or submit work that is not yours.
            You should follow your institution&apos;s rules on external help.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            4. Booking, pricing and payment
          </h2>
          <p className="mt-2">
            Prices shown on the site are indicative and can be adjusted based on
            scope, urgency, and complexity. Because pricing is negotiable, the
            final amount is always confirmed with you directly before work begins.
            Payment is handled via the methods shared with you (for example, UPI)
            and may be split into milestones if agreed in advance.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            5. Revisions and refunds
          </h2>
          <p className="mt-2">
            Reasonable revisions are included to align the work with the brief we
            agreed. If a &quot;refund shield&quot; or similar promise is offered,
            it applies only when the final deliverable clearly misses the written
            criteria discussed before the project starts. Any refunds are handled
            manually after a conversation about what went wrong.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            6. Intellectual property
          </h2>
          <p className="mt-2">
            You keep ownership of your idea, project, data, and any content you
            provide. You get the right to use the final slides and documents for
            your own academic or professional purposes. You agree not to resell
            them as a commercial template or package without a separate agreement.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            7. Confidentiality
          </h2>
          <p className="mt-2">
            Any project details you share privately (for example over WhatsApp)
            are treated as confidential and are not shared with others, unless you
            explicitly allow it or there is a legal requirement to do so.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            8. Limitation of liability
          </h2>
          <p className="mt-2">
            The service cannot guarantee specific grades, marks, job offers, or
            other outcomes. To the extent permitted by law, any liability is
            limited to the amount you paid for the relevant project.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            9. Changes to these terms
          </h2>
          <p className="mt-2">
            These terms may be updated occasionally. If changes are important,
            the text on this page will be updated with a new effective date. If
            you continue to use the site or book projects after changes, you
            accept the updated terms.
          </p>
        </section>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        This page is a simple informational template for a one‑person service and
        does not replace legal advice. If you need legal certainty, consider
        talking to a qualified professional.
      </p>

      <p className="mt-4 text-xs text-muted-foreground">
        Back to{" "}
        <Link href="/" className="underline underline-offset-2">
          home
        </Link>
        .
      </p>
    </main>
  )
}
