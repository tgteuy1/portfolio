import { useState } from 'react';
import './App.css';

const projects = [
  { label: "OCR Website",       repo: "tgteuy1/OCR-Thai-Text", style: "btn-primary" },
  { label: "Portfolio Website", repo: "tgteuy1/portfolio",      style: "btn-secondary" },
];

export default function App() {
  const [selected, setSelected]     = useState(null);
  const [repoData, setRepoData]     = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  async function handleProjectClick(project) {
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
      setRepoData(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="portfolio-root">
      <div className="bento">

        {/* AVATAR */}
        <div className="card avatar-card">
          <img src={require('./picture/me2.jpg')} className="me-art" alt="Avatar" />
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
          <p className="profile-quote">"Break things, learn from them, build better."</p>
        </div>

        {/* ABOUT ME */}
        <div className="card about-card">
          <div className="about-title">It's Me!</div>
          <div className="about-photo-frame">
            <img src={require('./picture/ellen-joe-ellen.gif')} alt="Photo" />
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
            <a className="contact-item" href="mailto:tgteuy1@gmail.com">
              <span className="contact-icon">◉</span>
              <span className="contact-text">tgteuy1@gmail.com</span>
            </a>
            <div className="contact-item">
              <span className="contact-icon">▣</span>
              <span className="contact-text">0967705364</span>
            </div>
            <a className="contact-item" href="https://www.facebook.com/teuy.kung.58/" target="_blank" rel="noreferrer">
              <span className="contact-icon">◎</span>
              <span className="contact-text">ทะนากะระ กลิ่นหวล</span>
            </a>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="card note-app-card">
          <div className="card-label">Featured Project</div>
          <div className="note-title">Project</div>

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

          <div className="repo-preview">
            {!selected && <p className="repo-hint">กดปุ่มด้านบนเพื่อดู repo</p>}

            {loading && (
              <div className="repo-loading">
                <div className="repo-spinner" />
                <span>กำลังดึงข้อมูล...</span>
              </div>
            )}

            {error && <p className="repo-error">⚠ {error}</p>}

            {repoData && (
              <div className="repo-card">
                <div className="repo-header">
                  <span className="repo-icon">⬡</span>
                  <a className="repo-name" href={repoData.html_url} target="_blank" rel="noreferrer">
                    {repoData.full_name}
                  </a>
                  <span className="repo-visibility">{repoData.visibility}</span>
                </div>
                <p className="repo-desc">{repoData.description || "No description provided."}</p>
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
          <img src={require('./picture/ellen-joe-zenless-zone-zero.gif')} alt="decoration" className="hire-gif" />
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
                <span className="skill-tag">MySQL</span>
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

        {/* TRANSCRIPT DROPDOWN */}
        <div className="card transcript-card">
          <button className="gallery-toggle" onClick={() => setTranscriptOpen(!transcriptOpen)}>
            <span>📄 Transcript</span>
            <span className={`gallery-arrow ${transcriptOpen ? "open" : ""}`}>▾</span>
          </button>
          {transcriptOpen && (
            <div className="gallery-panel">
              <img src={require('./picture/transcript.png')} alt="Transcript" className="a4-image" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}