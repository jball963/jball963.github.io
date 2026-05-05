const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["C#", "JavaScript", "Node.js", "SQL", "XAML"],
  },
  {
    title: "Frameworks & Platforms",
    items: [".NET", "WPF", "Express.js"],
  },
  {
    title: "Databases",
    items: ["SQL Server", "Azure SQL", "T-SQL"],
  },
  {
    title: "Cloud & Infrastructure",
    items: ["DigitalOcean", "Firebase Hosting", "Azure", "Cloudflare (DNS)"],
  },
  {
    title: "Tools & Practices",
    items: ["Visual Studio", "VS Code", "Git / GitHub", "REST APIs", "MVVM pattern"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      {SKILL_GROUPS.map((group) => (
        <div key={group.title}>
          <h3>{group.title}</h3>
          <ul className="skills-list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
