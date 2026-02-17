import { useState } from 'react';
import './App.css';

// ใส่ GitHub repo ของแต่ละโปรเจกต์ที่นี่
const projects = [
  {
    label: "OCR Website",
    repo: "tgteuy1/OCR-Thai-Text",   // เปลี่ยนเป็น user/repo จริง
    style: "btn-primary",
  },
  {
    label: "Portfolio Website",
    repo: "tgteuy1/portfolio",         // เปลี่ยนเป็น user/repo จริง
    style: "btn-secondary",
  },
];

export default function App() {
  const [selected, setSelected] = useState(null);  // เก็บปุ่มที่กด
  const [repoData, setRepoData] = useState(null);  // ข้อมูลจาก GitHub API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleProjectClick(project) {
    // ถ้ากดซ้ำ → ปิด
    if (selected === project.repo) {
      setSelected(null);
      setRepoData(null);
      return;
    }

    setSelected(project.repo);
    setLoading(true);
    setError(null);
    setRepoData(null);

    try {
      const res = await fetch(`https://api.github.com/repos/${project.repo}`);
      if (!res.ok) throw new Error("ไม่พบ repo นี้");
      const data = await res.json();
      setRepoData(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="portfolio-root">

      <div className="top-label">PROJECTS</div>

      <div className="bento">

        {/* AVATAR */}
        <div className="card avatar-card">
          <div className="art-placeholder"><img src={require('./picture/me2.jpg')} className="me-art" alt="Avatar" /></div>
        </div>

        {/* PROFILE */}
        <div className="card profile-card">
          <div className="card-label">About</div>
          <h1 className="profile-name">HI! I'M <span>K.Thanakon</span></h1>
          <p className="profile-role">UX/UI & Frontend Developer</p>
          <p className="profile-tagline">
            Crafting Stunning, User-Friendly Web{"\n"}
            Experiences with Passion and Precision
          </p>
          <p className="profile-quote">
            "Break things, learn from them, build better."
          </p>
          <div className="social-row">
            <button className="social-btn" title="GitHub">⬡</button>
            <button className="social-btn" title="Twitter">◈</button>
            <button className="social-btn" title="LinkedIn">▣</button>
            <button className="social-btn" title="Discord">◎</button>
            <button className="social-btn" title="Email">◉</button>
          </div>
        </div>

        {/* ABOUT ME */}
        <div className="card about-card">
          <div className="about-title">It's Me!</div>
          <div className="about-photo-frame">
            <div className="about-photo-placeholder">
              <img src={require('./picture/pholova.gif')} alt="Photo" />
            </div>
          </div>
          <p className="about-text">
            A CS student, my passion lies in the craft of building elegant,
            user-focused digital experiences through code and design.
          </p>
        </div>

        {/* CONTACT */}
        <div className="card contact-card">
          <div className="card-label">Contact Me</div>
          <div className="contact-list">
            <a className="contact-item" href="https://github.com/tgteuy1" target="_blank" rel="noreferrer">
              <span className="contact-icon">⬡</span>
              <span className="contact-text">github.com/tgteuy1</span>
            </a>
            <a className="contact-item" href="mailto:your@email.com">
              <span className="contact-icon">◉</span>
              <span className="contact-text">your@email.com</span>
            </a>
            <a className="contact-item" href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
              <span className="contact-icon">▣</span>
              <span className="contact-text">linkedin.com/in/you</span>
            </a>
            <a className="contact-item" href="https://discord.com/users/yourid" target="_blank" rel="noreferrer">
              <span className="contact-icon">◎</span>
              <span className="contact-text">Discord</span>
            </a>
          </div>
        </div>

        {/* NOTE APP — มีปุ่ม + repo preview */}
        <div className="card note-app-card">
          <div className="card-label">Featured Project</div>
          <div className="note-title">Project</div>

          {/* ปุ่มเลือกโปรเจกต์ */}
          <div className="btn-row">
            {projects.map((p) => (
              <button
                key={p.repo}
                className={`btn ${p.style} ${selected === p.repo ? "btn-active" : ""}`}
                onClick={() => handleProjectClick(p)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* พื้นที่แสดง GitHub Preview */}
          <div className="repo-preview">
            {/* ยังไม่ได้กด */}
            {!selected && (
              <p className="repo-hint">กดปุ่มด้านบนเพื่อดู repo</p>
            )}

            {/* กำลังโหลด */}
            {loading && (
              <div className="repo-loading">
                <div className="repo-spinner" />
                <span>กำลังดึงข้อมูล...</span>
              </div>
            )}

            {/* เกิด error */}
            {error && (
              <p className="repo-error">⚠ {error}</p>
            )}

            {/* แสดงข้อมูล repo */}
            {repoData && (
              <div className="repo-card">
                <div className="repo-header">
                  <span className="repo-icon">⬡</span>
                  <a
                    className="repo-name"
                    href={repoData.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {repoData.full_name}
                  </a>
                  <span className="repo-visibility">{repoData.visibility}</span>
                </div>

                <p className="repo-desc">
                  {repoData.description || "No description provided."}
                </p>

                <div className="repo-stats">
                  <span>⭐ {repoData.stargazers_count}</span>
                  <span>👁 {repoData.watchers_count}</span>
                  <span>🍴 {repoData.forks_count}</span>
                  {repoData.language && <span>● {repoData.language}</span>}
                </div>

                <div className="repo-updated">
                  อัปเดตล่าสุด: {new Date(repoData.updated_at).toLocaleDateString("th-TH")}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* HIRE ME */}
        <div className="card hire-card">
          <div className="hire-avatar-mini">
            <img src={require('./picture/lollipop-candy.gif')} alt="Photo" />
          </div>
        </div>

        {/* SKILLS */}
        <div className="card skills-card">
          <div className="card-label">Tech Stack</div>
          <div className="skills-grid">

            <div className="skill-group">
              <label>LANGUAGES</label>
              <div className="skill-tags">
                <span className="skill-tag">C/C++</span>
                <span className="skill-tag">JAVA</span>
                <span className="skill-tag">Python</span>
              </div>
            </div>

            <div className="skill-group">
              <label>FRONTEND</label>
              <div className="skill-tags">
                <span className="skill-tag">REACT</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">Bootstrap</span>
              </div>
            </div>

            <div className="skill-group">
              <label>BACKEND</label>
              <div className="skill-tags">
                <span className="skill-tag">NODE.JS</span>
                <span className="skill-tag">POSTGRESQL</span>
              </div>
            </div>

            <div className="skill-group">
              <label>TOOLS</label>
              <div className="skill-tags">
                <span className="skill-tag">GIT</span>
                <span className="skill-tag">GITHUB</span>
                <span className="skill-tag">CANVA</span>
                <span className="skill-tag">FIGMA</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}