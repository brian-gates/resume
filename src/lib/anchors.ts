/** Stable anchor id for an experience entry. Shared by the resume markup
 *  (server) and the TOC rail (client), so it must live outside "use client". */
export function roleAnchorId(job: { company: string; position: string }) {
  return `role-${job.company}-${job.position}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
