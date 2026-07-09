const PRIMARY_GROUPS = [
  {
    title: "Languages",
    items: ["C#", "JavaScript", "Node.js", "SQL", "T-SQL", "XAML"],
  },
  {
    title: "Frameworks & Platforms",
    items: [".NET", "WPF", "Express.js"],
  },
  {
    title: "Databases",
    items: ["SQL Server", "PostgreSQL"],
  },
  {
    title: "Cloud & Infrastructure",
    items: ["DigitalOcean"],
  },
  {
    title: "Tools & Practices",
    items: [
      "Visual Studio",
      "VS Code",
      "Git / GitHub",
      "REST APIs",
      "MVVM pattern",
    ],
  },
  {
    title: "AI-Assisted Development",
    items: [
      "Claude Code",
      "Project planning",
      "Issue triage",
      "Release management",
    ],
  },
];

const LEGACY_ITEMS = ["Azure", "Azure SQL", "Firebase Hosting", "Cloudflare (DNS)"];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      <div className="skills-tier">
        <p className="skills-tier-label">Currently building with</p>
        {PRIMARY_GROUPS.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            <ul className="skills-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="skills-tier">
        <p className="skills-tier-label">Worked with in production</p>
        <p className="skills-tier-note">
          Previously used, since consolidated onto DigitalOcean.
        </p>
        <ul className="skills-list">
          {LEGACY_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
