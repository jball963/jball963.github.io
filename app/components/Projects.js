import Link from "next/link";

const PROJECTS = [
  {
    slug: "migration-tool",
    title: "Time-Tracking Data Migration Tool",
    summary:
      "Internal WPF utility that migrated time-tracking data from a third-party legacy product into our SQL Server schema. Reverse-engineered undocumented file formats and rolled the whole migration in a single transaction.",
    stack: ["C#", ".NET 8", "WPF", "SQL Server"],
  },
  {
    slug: "infrastructure-consolidation",
    title: "Internal Web App: Infrastructure Consolidation",
    summary:
      "Re-architected an internal CRM from a three-vendor stack (Azure / Cloudflare / Firebase) onto a single provider for DNS, hosting, database, and file storage. Surfaced an unexpected cost win along the way.",
    stack: ["Node.js", "DigitalOcean", "Cloud architecture"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <p className="projects-intro">
        Deeper writeups on two pieces of the production work above.
      </p>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <Link
            key={p.slug}
            href={`/case-studies/${p.slug}/`}
            className="project-card"
          >
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <ul className="project-stack">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <span className="project-link">Read case study →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
