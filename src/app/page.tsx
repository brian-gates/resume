import { Button } from "~/components/ui/button";
import { Container } from "~/components/ui/container";
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

export default function Resumé() {
  return (
    <Container>
      <header>
        <H1>Brian Gates</H1>
        <H3>Staff Software Engineer</H3>
        <div>
          <Link href="mailto:brian.g.gates@gmail.com">
            brian.g.gates@gmail.com
          </Link>
          <span>-</span>
          <Link href="tel:+19492804708">(949)280-4708</Link>
          <span>-</span>
          <Link
            href="https://github.com/brian-gates"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/brian-gates
          </Link>
        </div>
        <Lead>
          Building mission critical software and tools with web technologies
          since 2006.
        </Lead>
      </header>

      <Section>
        <H2>Skills</H2>
        <div>
          <P>
            <span>Expert:</span> TypeScript, React, JavaScript, CSS, HTML,
            Node.js, RESTful APIs, Git, UI, UX, A11y, Express, Electron, CI,
            Next.js
          </P>
          <P>
            <span>Intermediate:</span> C++, C#, PHP, OAuth, Python, Neo4j,
            PostgreSQL, MySQL, GraphQL
          </P>
        </div>
      </Section>

      <Section>
        <H2>Experience</H2>

        <ExperienceCard>
          <HeaderContainer>
            <H3>Yardzen</H3>
            <DateRange>March 2024 – present</DateRange>
          </HeaderContainer>
          <List>
            <ListItem>
              Led the replatforming from WordPress to Next.js, integrated
              Contentful for seamless content updates, and developed key
              marketing projects, contributing to significant user engagement
              and conversion rates.
            </ListItem>
            <ListItem>
              Replatformed from slow WordPress to blazing-fast Next.js,
              deploying on CloudRun via GitHub Actions and Nx.
            </ListItem>
            <ListItem>
              Integrated Contentful, enabling non-engineering teams to create
              and update pages independently, reducing the release cycle from
              weeks to hours.
            </ListItem>
            <ListItem>
              Developed Lowe&apos;s Partnership page for a 750k email blast
              campaign, resulting in 3.6k visitors and 109 add-to-carts in two
              weeks.
            </ListItem>
            <ListItem>
              Created Contractor Connect marketing funnel, generating 200 leads
              and a 9% conversion rate in the first month.
            </ListItem>
            <ListItem>
              Established a Design System with design and marketing, including
              Iconography and Colors pages, leading to a more consistent user
              experience.
            </ListItem>
            <ListItem>
              Created a Storybook for documenting implemented components,
              leading to increased re-use by Product and Design teams.
            </ListItem>
            <ListItem>
              Ensured accessibility compliance by implementing best practices
              and adhering to WCAG guidelines.
            </ListItem>
            <ListItem>
              Trained junior team members and created extensive documentation
              for knowledge transfer.
            </ListItem>
          </List>
        </ExperienceCard>

        <ExperienceCard>
          <HeaderContainer>
            <H3>Hadrian</H3>
            <DateRange>Oct 2023 – Feb 2024</DateRange>
          </HeaderContainer>
          <JobTitle>Senior Software Engineer</JobTitle>
          <List>
            <ListItem>
              Helped build and release version two of Hadrian&apos;s internal
              workflow management software that guides all aspects of the
              factory&apos;s execution to build high precision parts for
              aerospace and aeronautics.
            </ListItem>
            <ListItem>
              Built visual Node-based workflow editor with Xyflow (formerly
              React Flow).
            </ListItem>
            <ListItem>
              Crafted responsive UIs from Figma designs in Next.js/React with
              TailwindCSS, Radix, and ShadUI.
            </ListItem>
            <ListItem>
              Created type-safe forms with helpful validations using Zod,
              React-hook-forms, and TypeScript.
            </ListItem>
            <ListItem>
              Ensured system observability by working with infrastructure team
              to integrate Next.js and Datadog for visibility into spans,
              traces, errors, logs, and session replays.
            </ListItem>
            <ListItem>
              Collaborated with backend teams to negotiate API endpoints&apos;
              proto specifications.
            </ListItem>
            <ListItem>
              Gathered feedback from users to implement features and
              improvements.
            </ListItem>
          </List>
        </ExperienceCard>

        <ExperienceCard>
          <HeaderContainer>
            <H3>Dollar Shave Club</H3>
            <DateRange>Feb 2020 - April 2023</DateRange>
          </HeaderContainer>
          <JobTitle>Software Engineering Manager</JobTitle>
          <P>Managed Frontend and Backend engineering teams.</P>
          <List>
            <ListItem>
              Reduced average time to response from weeks to hours by
              implementing a new engineering incident response process.
            </ListItem>
            <ListItem>
              Reduced average number of errors per session by 75% by improving
              observability tooling and triage process.
            </ListItem>
            <ListItem>
              Onboarded and offboarded third party engineering teams,
              established new processes and team structures to facilitate
              productive collaboration.
            </ListItem>
            <ListItem>
              Interviewed, hired, and onboarded new engineers.
            </ListItem>
            <ListItem>
              Held regular one on ones with engineers to discuss goals, growth,
              and career advancement.
            </ListItem>
            <ListItem>
              Oversaw migration of site to a new platform, reducing engineering
              overhead and total staff count.
            </ListItem>
            <ListItem>
              Orchestrated holiday events, parties, and game nights to boost
              morale. Two time winner of Top Tacos award for keeping it fun.
            </ListItem>
            <ListItem>
              Mentored engineers with regular code pairings and learning
              activities.
            </ListItem>
          </List>
        </ExperienceCard>

        <ExperienceCard>
          <HeaderContainer>
            <H3>Dollar Shave Club</H3>
            <DateRange>Feb 2018 - Feb 2020</DateRange>
          </HeaderContainer>
          <JobTitle>Senior Software Engineer</JobTitle>
          <P>Developed dollarshaveclub.com and internal tooling.</P>
          <List>
            <ListItem>
              Worked with the Frontend team to upgrade the site experience to
              the latest Web Content Accessibility Guidelines standards.
            </ListItem>
            <ListItem>
              Worked with the Data team to ensure functional business analytics
              and reporting.
            </ListItem>
            <ListItem>
              Ran A/B tests to measure the impact of UX changes.
            </ListItem>
            <ListItem>
              Maintained and added features to internal tooling.
            </ListItem>
            <ListItem>
              Rebuilt checkout experience from JavaScript to TypeScript and 0 to
              100% test coverage.
            </ListItem>
            <ListItem>
              Paired with Backend team engineers to discuss API changes.
            </ListItem>
            <ListItem>
              Partnered with design team to establish a common design language.
            </ListItem>
            <ListItem>
              Integrated Contentful to enable the Product team to rapidly roll
              out new landing pages.
            </ListItem>
          </List>
        </ExperienceCard>

        <ExperienceCard>
          <HeaderContainer>
            <H3>Codex Digital</H3>
            <DateRange>Jun 2013 - Oct 2017</DateRange>
          </HeaderContainer>
          <JobTitle>Senior Software Engineer</JobTitle>
          <P>Led the R&D team on various projects.</P>
          <List>
            <ListItem>
              Collaborated with the core team to implement a shot pull system
              used by Marvel using Node, Express, Neo4j, and Redis for the REST
              API, and Ember.js for the UI.
            </ListItem>
            <ListItem>
              Created cross-platform desktop application to facilitate uploading
              media to Netflix&apos;s Asset Ingestion API using Electron, React,
              Node, and CouchDB.
            </ListItem>
            <ListItem>
              Created a reporting system to track and verify shot archival used
              by Shed using Node, Express, Neo4j, Redis, wkhtmltopdf, and
              Ember.js.
            </ListItem>
            <ListItem>
              Created a lens tracking database using Node.js, Ember.js, Neo4j,
              and Redis.
            </ListItem>
            <ListItem>
              Implemented workflow tools such as JIRA, GitHub, Slack, and Travis
              CI, to help team organization, communication, and development
              flow.
            </ListItem>
            <ListItem>
              Worked closely with a security team to ensure software always met
              highest security standards, including code audits and penetration
              testing.
            </ListItem>
          </List>
        </ExperienceCard>

        <ExperienceCard>
          <HeaderContainer>
            <H3>5th Kind</H3>
            <DateRange>Jun 2009 - Jun 2013</DateRange>
          </HeaderContainer>
          <JobTitle>Lead Software Engineer</JobTitle>
          <P>
            Led the team in the development and maintenance of their Digital
            Asset Management software.
          </P>
          <List>
            <ListItem>
              Engineered proprietary front-end extensible component-based JS
              framework.
            </ListItem>
            <ListItem>
              Assisted in building a proprietary component-based PHP framework.
            </ListItem>
            <ListItem>
              Maintained and extended custom ORM, including applying an
              optimization that reduced memory usage by ~85%.
            </ListItem>
            <ListItem>
              Worked with the team to refine development processes, discuss
              development ideas, and encourage high morale and productivity.
            </ListItem>
            <ListItem>
              Worked closely with management to set and achieve realistic goals
              and expectations.
            </ListItem>
            <ListItem>
              Ensured code met and maintained high security standards, including
              security audits and penetration tests.
            </ListItem>
          </List>
        </ExperienceCard>
      </Section>
      <Button>Contact Me</Button>
    </Container>
  );
}
