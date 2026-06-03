/* eslint-disable @next/next/no-img-element -- static SVG hero and local PNG */
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import type { WorkProject } from "@/lib/work-projects";

type Props = { project: WorkProject };

export function FrontendAutomationCaseStudy({ project }: Props) {
  return (
    <>
      <CaseStudyHeader title={project.title} />
      <div className="panel mt-8 overflow-hidden">
        <img
          src={project.imageSrc}
          alt=""
          className="w-full object-cover"
          role="presentation"
        />
      </div>
      <div className="article-body mt-8">
        <p>{project.summary}</p>
        <p>
          The runnable suite lives under{" "}
          <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 text-sm text-[var(--ink)]">
            qa-the-internet/
          </code>{" "}
          in this repository: fifteen focused UI checks against{" "}
          <a
            className="text-link"
            href="https://the-internet.herokuapp.com/"
            target="_blank"
            rel="noreferrer"
          >
            the-internet.herokuapp.com
          </a>
          , written in Python with pytest and Playwright, styled for PEP 8, and ready for the
          provided Docker image.
        </p>
        <ul>
          <li>Covers navigation, forms, tables, hovers, key events, new windows, and HTTP basic auth.</li>
          <li>
            Each test includes a short docstring; inline comments only where selectors need
            context.
          </li>
          <li>
            Download the runnable project docs:{" "}
            <a className="text-link" href="/work/frontend-automation-readme.txt" download>
              README
            </a>
            ,{" "}
            <a className="text-link" href="/work/frontend-automation-requirements.txt" download>
              requirements.txt
            </a>
            , and{" "}
            <a className="text-link" href="/work/frontend-automation-notes.txt" download>
              notes.txt
            </a>
            .
          </li>
        </ul>
        <div className="mt-8">
          <p className="type-panel-title">Latest run (click to open)</p>
          <a
            href="/work/frontend-automation-pytest-output.png"
            target="_blank"
            rel="noreferrer"
            className="mt-3 block overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--charcoal)] transition hover:opacity-95"
          >
            <img
              src="/work/frontend-automation-pytest-output.png"
              alt="Pytest output from the Heroku the-internet suite"
              className="w-full object-contain object-top"
            />
          </a>
          <p className="type-caption mt-2">
            Generated with{" "}
            <code className="text-[var(--graphite)]">python scripts/snapshot_pytest_output.py</code>{" "}
            after a green test run.
          </p>
        </div>
        <p>
          <a className="text-link" href="/work/frontend-automation-notes.txt" download>
            Download notes.txt
          </a>{" "}
          (same as{" "}
          <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 text-sm">
            qa-the-internet/notes.txt
          </code>
          ) for a senior-level write-up of the approach and trade-offs.
        </p>
      </div>
    </>
  );
}
