import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Navbar from "../../components/Navbar";
import type { Route } from "./+types/home";
import Button from "../../components/ui/Button";
import Upload from "../../components/Upload";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const timestamp = Date.now();
  return (
    <div className="home">
      <Navbar />
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse">
            </div>
          </div>
          <p>Introducing Roomie</p>
        </div>

        <h1>Build beautiful spaces at the speed of thought with Roomie</h1>
        <p className="subtitle">Roomie is an AI-firsh design enviroment that helps you visulaize, render and ship architectural pojects faster than ever</p>

        <div className="actions">
          <a href="#upload" className="cta">
            Start Building <ArrowRight className="icon" />
          </a>
          <Button variant="outline" size="lg" className="demo">
            Watch Demo
          </Button>
        </div>

        <div id="upload" className="upload-shell">
          <div className="grid-overlay"/>

          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h3>Upload your floor plan</h3>
              <p>Supports JPG, PNG, formats up to 10MB</p>
            </div>

            <Upload onComplete={() => console.log("upload completed")} />


          </div>
        </div>
      
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Project</h2>
              <p>Your latest work and shared community projects, all in one place</p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="preview">
                <img src="https://iili.io/BmCOa3u.png" alt="Project" />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project Name</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date(timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
