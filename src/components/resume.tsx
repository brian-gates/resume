import { Github, Globe, Mail, Phone } from "lucide-react";
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
import type { Resume } from "../generated/graphql";

export function Resume({
  name = "",
  title = "",
  email = "",
  phone = "",
  github,
  website = "",
  summary = "",
  skills,
  experiences,
}: Resume) {
  return (
    <Container>
      <header>
        <div className="flex justify-between items-center mb-4">
          <H1>{name}</H1>
          <ModeToggle />
        </div>
        <H3>{title}</H3>
        <div className="flex flex-col gap-2 my-4 items-start">
          <Link href={`mailto:${email}`} className="flex items-center gap-1.5">
            <Mail className="h-4 w-4" />
            {email}
          </Link>
          <Link href={`tel:+19492804708`} className="flex items-center gap-1.5">
            <Phone className="h-4 w-4" />
            {phone}
          </Link>
          {github && (
            <Link
              href={String(github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <Github className="h-4 w-4" />
              github.com/brian-gates
            </Link>
          )}
          <Link
            href={String(website)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            <Globe className="h-4 w-4" />
            {website}
          </Link>
        </div>
        <Lead>{summary}</Lead>
      </header>

      {skills && (
        <Section>
          <H2>Skills</H2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4 py-2">
              <P className="mb-2 font-medium">Expert:</P>
              <div className="flex flex-wrap gap-2">
                {(skills ?? [])
                  .filter((s) => s?.level === "expert")
                  .map((s) => s?.name ?? "")
                  .map((skill) => (
                    <Badge key={skill} variant="expert">
                      {skill}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="border-l-4 border-accent pl-4 py-2">
              <P className="mb-2 font-medium">Intermediate:</P>
              <div className="flex flex-wrap gap-2">
                {(skills ?? [])
                  .filter((s) => s?.level === "intermediate")
                  .map((s) => s?.name ?? "")
                  .map((skill) => (
                    <Badge key={skill} variant="intermediate">
                      {skill}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section>
        <H2>Experience</H2>

        {(experiences ?? []).map((exp) => (
          <ExperienceCard key={`${exp?.company ?? ""}-${exp?.position ?? ""}`}>
            <HeaderContainer>
              <H3>{exp?.company ?? ""}</H3>
              <DateRange>{exp?.period ?? ""}</DateRange>
            </HeaderContainer>
            <JobTitle>{exp?.position ?? ""}</JobTitle>
            {exp?.description && <P>{exp.description}</P>}
            <List>
              {(exp?.achievements ?? []).map((a, index) => (
                <ListItem key={index}>{a?.text ?? ""}</ListItem>
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
