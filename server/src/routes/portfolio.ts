import { Router } from "express";
import { profile } from "../data/profile";
import { skillCategories, techBadges } from "../data/skills";
import { experiences } from "../data/experience";
import { projects } from "../data/projects";
import { HttpError } from "../errors";

const router = Router();

router.get("/profile", (_req, res) => {
  res.json({ data: profile });
});

router.get("/skills", (_req, res) => {
  res.json({
    data: {
      categories: skillCategories,
      techBadges,
    },
  });
});

router.get("/experience", (_req, res) => {
  res.json({ data: experiences, count: experiences.length });
});

router.get("/experience/:id", (req, res) => {
  const experience = experiences.find((item) => item.id === req.params.id);
  if (!experience) {
    throw new HttpError(404, `No experience found with id "${req.params.id}"`);
  }
  res.json({ data: experience });
});

router.get("/projects", (req, res) => {
  const { featured } = req.query;
  let results = projects;

  if (featured !== undefined) {
    if (featured !== "true" && featured !== "false") {
      throw new HttpError(400, 'Query param "featured" must be "true" or "false"');
    }
    const wantFeatured = featured === "true";
    results = results.filter((project) => project.featured === wantFeatured);
  }

  res.json({ data: results, count: results.length });
});

router.get("/projects/:id", (req, res) => {
  const project = projects.find((item) => item.id === req.params.id);
  if (!project) {
    throw new HttpError(404, `No project found with id "${req.params.id}"`);
  }
  res.json({ data: project });
});

export default router;
