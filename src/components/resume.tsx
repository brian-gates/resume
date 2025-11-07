import { Github, Globe, Linkedin, Mail, Phone } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Container } from "~/components/ui/container";
import { DownloadButtons } from "~/components/ui/download-buttons";
import { ModeToggle } from "~/components/ui/mode-toggle";
import {
  DateRange,
  ExperienceCard,
  H1,
  H2,
  H3,
  HeaderContainer,
  JobTitle,
  Lead,
  Link,
  List,
  ListItem,
  P,
  Section,
} from "~/components/ui/typography";
import type { ResumeData } from "~/data/resume";

export function Resume({
  name,
  title,
  contact,
  summary,
  skills,
  experience,
}: ResumeData) {
  return (
    <Container>
      <header>
        <div className="flex justify-between items-center mb-4">
          <H1>{name}</H1>
          <ModeToggle />
        </div>
        <H3>{title}</H3>
        <div className="flex flex-col gap-2 my-4 items-start">
          <Link
            href={`mailto:${contact.email}`}
            className="flex items-center gap-1.5"
          >
            <Mail className="h-4 w-4" />
            {contact.email}
          </Link>
          <Link href={`tel:+19492804708`} className="flex items-center gap-1.5">
            <Phone className="h-4 w-4" />
            {contact.phone}
          </Link>
          <Link
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            <Github className="h-4 w-4" />
            github.com/brian-gates
          </Link>
          <Link
            href={contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            <Globe className="h-4 w-4" />
            {contact.website}
          </Link>
          <Link
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            <Linkedin className="h-4 w-4" />
            linkedin.com/brian-gates
          </Link>
        </div>
        <Lead>{summary}</Lead>
      </header>

      <Section>
        <H2>Skills</H2>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4 py-2">
            <P className="mb-2 font-medium">Expert:</P>
            <div className="flex flex-wrap gap-2">
              {skills.expert.map((skill) => (
                <Badge key={skill} variant="expert">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-l-4 border-accent pl-4 py-2">
            <P className="mb-2 font-medium">Intermediate:</P>
            <div className="flex flex-wrap gap-2">
              {skills.intermediate.map((skill) => (
                <Badge key={skill} variant="intermediate">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <H2>Experience</H2>

        {experience.map((job) => (
          <ExperienceCard key={`${job.company}-${job.position}`}>
            <HeaderContainer>
              <H3>{job.company}</H3>
              <DateRange>{job.period}</DateRange>
            </HeaderContainer>
            <JobTitle>{job.position}</JobTitle>
            {job.description && <P>{job.description}</P>}
            <List>
              {job.achievements.map((achievement, index) => (
                <ListItem key={index}>{achievement}</ListItem>
              ))}
            </List>
          </ExperienceCard>
        ))}
      </Section>
      <div className="flex flex-col items-center gap-4 mt-8">
        <DownloadButtons />
        <Link
          href="https://github.com/brian-gates/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm mt-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-3 w-3" />
          Source code available on GitHub
        </Link>
      </div>
    </Container>
  );
}
