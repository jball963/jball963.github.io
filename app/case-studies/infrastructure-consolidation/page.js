import Link from "next/link";

export const metadata = {
  title: "Internal Web App Infrastructure Consolidation — Joseph Ball",
  description:
    "Case study: re-architected an internal CRM from a three-vendor cloud stack onto a single provider for DNS, hosting, database, and file storage.",
};

export default function InfrastructureConsolidationCaseStudy() {
  return (
    <article className="case-study">
      <p className="case-study-back">
        <Link href="/#projects">← Back to portfolio</Link>
      </p>

      <header className="case-study-header">
        <p className="case-study-eyebrow">Case study</p>
        <h1>Internal Web App — Infrastructure Consolidation</h1>
        <ul className="case-study-stack">
          <li>Node.js</li>
          <li>DigitalOcean</li>
          <li>Cloud architecture</li>
        </ul>
      </header>

      <section>
        <h2>TL;DR</h2>
        <p>
          Internal CRM-style tool that started on a patchwork of three cloud
          vendors. Re-architected the whole stack onto a single provider for
          DNS, hosting, database, and file storage. One dashboard, one bill,
          one place to make a change. Cost ended up lower too — partly by
          accident.
        </p>
      </section>

      <section>
        <h2>What it is</h2>
        <ul>
          <li>
            Internal employee tool: tracks customer activity, call logs,
            invoice status, and support subscriptions.
          </li>
          <li>Node.js + vanilla JavaScript, SQL backend, internal-only.</li>
        </ul>
      </section>

      <section>
        <h2>Before</h2>
        <ul className="kv-list">
          <li><strong>DNS</strong> — Cloudflare</li>
          <li><strong>Static hosting</strong> — Firebase</li>
          <li><strong>Database</strong> — Azure SQL</li>
          <li><strong>File storage</strong> — split across Azure / Firebase</li>
        </ul>
        <p>Four dashboards, four billing lines, four credential sets.</p>
      </section>

      <section>
        <h2>After</h2>
        <p>
          DNS, app server, managed database, and object storage all on
          DigitalOcean — single account, single bill, single set of access
          controls.
        </p>
      </section>

      <section>
        <h2>Why</h2>
        <ul>
          <li>
            Small team. Operational simplicity beats best-in-class for any
            individual component when no one&apos;s a dedicated SRE.
          </li>
          <li>
            Cross-vendor changes (cert renewals, DNS edits during a deploy,
            credential rotation) used to need coordination across panels — now
            one panel.
          </li>
          <li>
            Cost legibility: one invoice, one place to see what&apos;s spent.
          </li>
        </ul>
      </section>

      <section>
        <h2>What it actually cost (a story)</h2>
        <p>
          I kept the old Azure SQL up briefly as a fallback during the
          transition — wasn&apos;t using it, just hadn&apos;t torn it down yet.
          Within a couple of months the monthly bill on that idle database
          jumped from roughly $5–15 to ~$60 with no usage change on my end.
        </p>
        <p>
          The consolidated DigitalOcean stack came in well below what either
          side had been costing individually. Saving money wasn&apos;t the
          reason for the move, but the move surfaced one after the fact.
        </p>
      </section>

      <section>
        <h2>Trade-offs I took on knowingly</h2>
        <ul>
          <li>
            More vendor lock-in. Reversibility is cheap at this size and the
            daily ergonomic win was worth it.
          </li>
          <li>
            Some Azure SQL conveniences didn&apos;t carry over; rewrote two
            queries and retired one feature we weren&apos;t using.
          </li>
        </ul>
      </section>

      <p className="case-study-back">
        <Link href="/#projects">← Back to portfolio</Link>
      </p>
    </article>
  );
}
