import Link from "next/link";

export const metadata = {
  title: "Time-Tracking Data Migration Tool | Joseph Ball",
  description:
    "Case study: WPF utility for migrating time-tracking data from a legacy third-party product into our SQL Server schema.",
};

export default function MigrationToolCaseStudy() {
  return (
    <article className="case-study">
      <p className="case-study-back">
        <Link href="/#projects">← Back to portfolio</Link>
      </p>

      <header className="case-study-header">
        <p className="case-study-eyebrow">Case study</p>
        <h1>Time-Tracking Data Migration Tool</h1>
        <ul className="case-study-stack">
          <li>C#</li>
          <li>.NET 8</li>
          <li>WPF</li>
          <li>SQL Server</li>
        </ul>
      </header>

      <section>
        <h2>TL;DR</h2>
        <p>
          Internal WPF utility that migrated time-tracking data from a
          third-party legacy product into our team&apos;s SQL Server schema.
          Used to onboard a handful of customers off the legacy system, then
          folded the migration logic into our main application.
        </p>
      </section>

      <section>
        <h2>The problem</h2>
        <ul>
          <li>
            Customers were stuck on a third-party legacy product with
            undocumented data files, no vendor migration path, and no API.
          </li>
          <li>
            Years of historical records that couldn&apos;t be dropped on the
            floor.
          </li>
          <li>
            All-local deployment model (desktop app against a local SQL Server
            on the customer&apos;s machine), so the migration had to run on-site
            against their own database, not as a cloud job.
          </li>
        </ul>
      </section>

      <section>
        <h2>What I shipped</h2>
        <ul>
          <li>WPF / .NET 8 desktop utility, single Release/x64 build.</li>
          <li>
            Three layers: UI → static utils (file parser, database handler) →
            simple model types.
          </li>
          <li>
            Discovers the legacy install directory, finds the local SQL Server
            via Registry + <code>SqlDataSourceEnumerator</code>, authenticates,
            parses the legacy files, migrates, and rebuilds derived tables.
          </li>
        </ul>
      </section>

      <section>
        <h2>Three decisions worth talking about</h2>

        <h3>1. Single SQL transaction wrapping the entire migration</h3>
        <p>
          <strong>Why:</strong> partial state on failure was unacceptable for
          this data.
        </p>
        <p>
          <strong>Cost:</strong> held the connection longer; bigger blast
          radius for a bad row.
        </p>

        <h3>2. Three-tier employee match: badge → (hire date + name) → name-only</h3>
        <p>
          <strong>Why:</strong> legacy IDs weren&apos;t reliable across
          systems.
        </p>
        <p>
          <strong>Trade-off:</strong> name-only matching is ambiguous, so
          unmatched records skip rather than guess wrong.
        </p>

        <h3>3. SqlBulkCopy for the bulk time-entry insert</h3>
        <p>
          <strong>Why:</strong> 20,000+ rows for a large customer; row-by-row
          inserts were minutes.
        </p>
        <p>
          <strong>Trade-off:</strong> less granular per-record error logging.
          Chosen consciously.
        </p>
      </section>

      <section>
        <h2>The hardest part</h2>
        <p>
          Reverse-engineering the legacy file formats. Two of them: an INI-style
          configuration file with <code>[EmployeeN]</code> sections for the
          employee list, and space-delimited fixed-format records (
          <code>IN/OUT MM/dd/yyyy HH:mm:ss</code>) for the entries. Both
          undocumented; worked them out by reading sample backups from real
          customer installs.
        </p>
        <p>
          One legacy field turned out to be base64-encoded; invalid values
          default to a sentinel.
        </p>
      </section>

      <section>
        <h2>Outcome and what I learned</h2>
        <p>
          Tested against dozens of legacy backups; deployed live to a handful
          of customers before the migration logic was folded into our main
          application as an in-product step. The standalone utility is now
          archived, which was the right outcome.
        </p>
        <p>
          <strong>Lesson:</strong> shipping the standalone tool first was the
          right call. Running it against real data surfaced edge cases (the
          ambiguous name matches, the base64 field) before they were baked
          into the main app.
        </p>
      </section>

      <p className="case-study-back">
        <Link href="/#projects">← Back to portfolio</Link>
      </p>
    </article>
  );
}
