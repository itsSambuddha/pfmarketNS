// app/privacy/page.tsx
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <main className="relative mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Privacy
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page explains what information this site and service actually store
          (which is very little), and how the rest of your details are handled
          privately.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground">
            1. No database, no account system
          </h2>
          <p className="mt-2">
            This site does not use a traditional database or account system. There
            is no login, no stored profiles, and no cloud‑stored project history.
            Most of the site content is static and driven by JSON configuration.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            2. What the site does collect
          </h2>
          <p className="mt-2">
            Forms on the site may use data from local JSON to pre‑fill fields for
            your convenience. Any information you type into those forms is either:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              Stored locally in your own browser or device (for example, while you
              are filling something in), or
            </li>
            <li>
              Sent directly to you and the service owner via email or messaging
              tools, depending on how the form is wired.
            </li>
          </ul>
          <p className="mt-2">
            The site itself does not maintain a central database of your personal
            information.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            3. Information shared voluntarily after booking
          </h2>
          <p className="mt-2">
            Once you decide to go ahead with a project, most real details (like
            your name, project brief, drafts, or marksheets) are shared manually
            via channels such as WhatsApp, email, or similar. Those conversations
            are between you and the service owner directly, not stored in this
            website.
          </p>
          <p className="mt-2">
            That information is used only to understand your project, deliver the
            work, and follow up if needed. It is not sold or shared with third
            parties for marketing.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            4. Cookies and basic analytics
          </h2>
          <p className="mt-2">
            The site may use minimal analytics or logging (for example, privacy‑
            friendly page view tracking) to understand which sections are used.
            These tools are configured, where possible, to avoid collecting
            personally identifiable information. You can control cookies via your
            browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            5. Storage and security
          </h2>
          <p className="mt-2">
            Any project files you send directly (for example via WhatsApp or
            email) may be stored on those services and on the service owner&apos;s
            personal devices. Reasonable care is taken to keep them private, but
            no online system can be guaranteed 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            6. How long data is kept
          </h2>
          <p className="mt-2">
            Project conversations and files may be kept for a while to support
            future revisions, reference, or bookkeeping. You can ask for specific
            messages or files to be deleted where that is practical and allowed by
            law or platform limitations.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            7. Your choices
          </h2>
          <p className="mt-2">
            You can choose how much detail you share about your identity and
            institution, and which channel (for example WhatsApp or email) you are
            comfortable using. If you want certain files or conversations removed
            after a project, you can request that directly from the service owner.
          </p>
        </section>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        This policy is designed for a very small, one‑person setup with no
        database. If the service grows into something larger or starts storing
        more data, this page will need to be updated.
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
