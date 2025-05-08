import Link from "next/link";

export default function Resumé() {
  return (
    <div>
      <header>
        <h1>Brian Gates</h1>
        <h2>Staff Software Engineer</h2>
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
        <p>
          Building mission critical software and tools with web technologies
          since 2006.
        </p>
      </header>

      <section>
        <h2>Skills</h2>
        <div>
          <p>
            <span>Expert:</span> TypeScript, React, JavaScript, CSS, HTML,
            Node.js, RESTful APIs, Git, UI, UX, A11y, Express, Electron, CI,
            Next.js
          </p>
          <p>
            <span>Intermediate:</span> C++, C#, PHP, OAuth, Python, Neo4j,
            PostgreSQL, MySQL, GraphQL
          </p>
        </div>
      </section>

      <section>
        <h2>Experience</h2>

        <div>
          <div>
            <h3>Yardzen</h3>
            <span>March 2024 – present</span>
          </div>
          <ul>
            <li>
              Led the replatforming from WordPress to Next.js, integrated
              Contentful for seamless content updates, and developed key
              marketing projects, contributing to significant user engagement
              and conversion rates.
            </li>
            <li>
              Replatformed from slow WordPress to blazing-fast Next.js,
              deploying on CloudRun via GitHub Actions and Nx.
            </li>
            <li>
              Integrated Contentful, enabling non-engineering teams to create
              and update pages independently, reducing the release cycle from
              weeks to hours.
            </li>
            <li>
              Developed Lowe&apos;s Partnership page for a 750k email blast
              campaign, resulting in 3.6k visitors and 109 add-to-carts in two
              weeks.
            </li>
            <li>
              Created Contractor Connect marketing funnel, generating 200 leads
              and a 9% conversion rate in the first month.
            </li>
            <li>
              Established a Design System with design and marketing, including
              Iconography and Colors pages, leading to a more consistent user
              experience.
            </li>
            <li>
              Created a Storybook for documenting implemented components,
              leading to increased re-use by Product and Design teams.
            </li>
            <li>
              Ensured accessibility compliance by implementing best practices
              and adhering to WCAG guidelines.
            </li>
            <li>
              Trained junior team members and created extensive documentation
              for knowledge transfer.
            </li>
          </ul>
        </div>

        <div>
          <div>
            <h3>Hadrian</h3>
            <span>Oct 2023 – Feb 2024</span>
          </div>
          <p>Senior Software Engineer</p>
          <ul>
            <li>
              Helped build and release version two of Hadrian&apos;s internal
              workflow management software that guides all aspects of the
              factory&apos;s execution to build high precision parts for
              aerospace and aeronautics.
            </li>
            <li>
              Built visual Node-based workflow editor with Xyflow (formerly
              React Flow).
            </li>
            <li>
              Crafted responsive UIs from Figma designs in Next.js/React with
              TailwindCSS, Radix, and ShadUI.
            </li>
            <li>
              Created type-safe forms with helpful validations using Zod,
              React-hook-forms, and TypeScript.
            </li>
            <li>
              Ensured system observability by working with infrastructure team
              to integrate Next.js and Datadog for visibility into spans,
              traces, errors, logs, and session replays.
            </li>
            <li>
              Collaborated with backend teams to negotiate API endpoints&apos;
              proto specifications.
            </li>
            <li>
              Gathered feedback from users to implement features and
              improvements.
            </li>
          </ul>
        </div>

        <div>
          <div>
            <h3>Dollar Shave Club</h3>
            <span>Feb 2020 - April 2023</span>
          </div>
          <p>Software Engineering Manager</p>
          <p>Managed Frontend and Backend engineering teams.</p>
          <ul>
            <li>
              Reduced average time to response from weeks to hours by
              implementing a new engineering incident response process.
            </li>
            <li>
              Reduced average number of errors per session by 75% by improving
              observability tooling and triage process.
            </li>
            <li>
              Onboarded and offboarded third party engineering teams,
              established new processes and team structures to facilitate
              productive collaboration.
            </li>
            <li>Interviewed, hired, and onboarded new engineers.</li>
            <li>
              Held regular one on ones with engineers to discuss goals, growth,
              and career advancement.
            </li>
            <li>
              Oversaw migration of site to a new platform, reducing engineering
              overhead and total staff count.
            </li>
            <li>
              Orchestrated holiday events, parties, and game nights to boost
              morale. Two time winner of Top Tacos award for keeping it fun.
            </li>
            <li>
              Mentored engineers with regular code pairings and learning
              activities.
            </li>
          </ul>
        </div>

        <div>
          <div>
            <h3>Dollar Shave Club</h3>
            <span>Feb 2018 - Feb 2020</span>
          </div>
          <p>Senior Software Engineer</p>
          <p>Developed dollarshaveclub.com and internal tooling.</p>
          <ul>
            <li>
              Worked with the Frontend team to upgrade the site experience to
              the latest Web Content Accessibility Guidelines standards.
            </li>
            <li>
              Worked with the Data team to ensure functional business analytics
              and reporting.
            </li>
            <li>Ran A/B tests to measure the impact of UX changes.</li>
            <li>Maintained and added features to internal tooling.</li>
            <li>
              Rebuilt checkout experience from JavaScript to TypeScript and 0 to
              100% test coverage.
            </li>
            <li>Paired with Backend team engineers to discuss API changes.</li>
            <li>
              Partnered with design team to establish a common design language.
            </li>
            <li>
              Integrated Contentful to enable the Product team to rapidly roll
              out new landing pages.
            </li>
          </ul>
        </div>

        <div>
          <div>
            <h3>Codex Digital</h3>
            <span>Jun 2013 - Oct 2017</span>
          </div>
          <p>Senior Software Engineer</p>
          <p>Led the R&D team on various projects.</p>
          <ul>
            <li>
              Collaborated with the core team to implement a shot pull system
              used by Marvel using Node, Express, Neo4j, and Redis for the REST
              API, and Ember.js for the UI.
            </li>
            <li>
              Created cross-platform desktop application to facilitate uploading
              media to Netflix&apos;s Asset Ingestion API using Electron, React,
              Node, and CouchDB.
            </li>
            <li>
              Created a reporting system to track and verify shot archival used
              by Shed using Node, Express, Neo4j, Redis, wkhtmltopdf, and
              Ember.js.
            </li>
            <li>
              Created a lens tracking database using Node.js, Ember.js, Neo4j,
              and Redis.
            </li>
            <li>
              Implemented workflow tools such as JIRA, GitHub, Slack, and Travis
              CI, to help team organization, communication, and development
              flow.
            </li>
            <li>
              Worked closely with a security team to ensure software always met
              highest security standards, including code audits and penetration
              testing.
            </li>
          </ul>
        </div>

        <div>
          <div>
            <h3>5th Kind</h3>
            <span>Jun 2009 - Jun 2013</span>
          </div>
          <p>Lead Software Engineer</p>
          <p>
            Led the team in the development and maintenance of their Digital
            Asset Management software.
          </p>
          <ul>
            <li>
              Engineered proprietary front-end extensible component-based JS
              framework.
            </li>
            <li>
              Assisted in building a proprietary component-based PHP framework.
            </li>
            <li>
              Maintained and extended custom ORM, including applying an
              optimization that reduced memory usage by ~85%.
            </li>
            <li>
              Worked with the team to refine development processes, discuss
              development ideas, and encourage high morale and productivity.
            </li>
            <li>
              Worked closely with management to set and achieve realistic goals
              and expectations.
            </li>
            <li>
              Ensured code met and maintained high security standards, including
              security audits and penetration tests.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
