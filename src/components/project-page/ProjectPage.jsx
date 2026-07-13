import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { projects } from "../../data/projects";
import ScrollReveal from "../scroll-reveal/ScrollReveal";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) {
      navigate("/", { replace: true });
    }
  }, [project, navigate]);

  if (!project) return null;

  return (
    <div className="project-page">
      <div className="project-page-vignette" aria-hidden="true" />

      <div className="project-page-inner">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="project-back">
            <span className="project-back-arrow" aria-hidden="true">←</span>
            Back to the hall
          </Link>
        </motion.div>

        <ScrollReveal>
          <div className="project-page-content">
            {project.year && (
              <span className="project-year">{project.year}</span>
            )}

            <h1 className="project-title">{project.title}</h1>

            {project.tags?.length > 0 && (
              <ul className="project-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}

            <p className="project-description">{project.description}</p>

            {project.link && (
              <a
                href={project.link}
                className="project-visit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">✦</span>
                Visit Project
                <span className="project-visit-arrow" aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
