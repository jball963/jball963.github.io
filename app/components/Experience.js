const ROLES = [
  {
    company: "Myers Integrated Systems, Lilly, PA",
    titles: [
      { title: "Software Developer", dates: "Jun 2024 – Present" },
      { title: "Software Development Intern", dates: "Apr 2024 – Jun 2024" },
    ],
    bullets: [
      "Sole developer for two production systems supporting 200+ clients (a Node.js web application and a C#/.NET/WPF desktop clocking application), with no dedicated team or senior oversight.",
      "Architected and built a client management web application from scratch using Node.js and vanilla JavaScript, serving as the company's internal CRM for support tickets, field service dispatch, client notes, pricing, and a regulatory audit compliance workflow.",
      "Rescued and shipped an inherited, unfinished C#/.NET/WPF clocking application to production. Reverse-engineered an undocumented codebase, refactored core logic, and stabilized the system now actively running on dozens of client installs.",
      "Migrated legacy clocking data from proprietary .cfg/.dat file storage into SQL Server, converting up to 8 years of historical records and 20,000+ rows per large client into a structured relational database.",
      "Independently managed the full cloud infrastructure lifecycle. Deployed initially on Firebase Hosting with Azure SQL, then re-architected onto DigitalOcean with Cloudflare for DNS, reducing complexity and consolidating hosting costs.",
      "Integrated applications with SQL Server and Azure SQL databases; designed schemas supporting data validation, audit tracking, and multi-year transactional history.",
      "Fielded support calls and maintained the company's primary point-of-sale codebase, diagnosing and resolving minor bugs to keep client systems running smoothly.",
      "Manage project planning, issue triage, and release coordination across both production systems, using Claude Code as an integrated part of the workflow to keep development organized and moving efficiently.",
      "Self-directed adoption of Git/GitHub workflows, cloud services, and deployment pipelines with no formal onboarding or mentorship.",
    ],
  },
  {
    company: "Altoona Area School District, Altoona, PA",
    titles: [
      { title: "IT Helpdesk Support", dates: "Aug 2021 – Jun 2022" },
    ],
    bullets: [
      "Provided technical support to students and faculty, diagnosing and resolving hardware, software, and network issues.",
      "Documented service tickets and communicated technical information clearly to non-technical staff and administrators.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2>Experience</h2>
      {ROLES.map((role) => (
        <div key={role.company}>
          <h3>{role.company}</h3>
          <p>
            {role.titles.map((t, i) => (
              <span key={t.title}>
                <strong>{t.title}</strong> · {t.dates}
                {i < role.titles.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
          <ul>
            {role.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
