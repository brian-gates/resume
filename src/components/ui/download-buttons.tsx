"use client";

import { FileJson, FileText, FileType } from "lucide-react";
import React, { ReactNode } from "react";
import { Link } from "./typography";

const formats = [
  {
    name: "PDF",
    extension: "pdf",
    label: "PDF Document",
    icon: <FileType className="h-4 w-4" />,
  },
  {
    name: "DOCX",
    extension: "docx",
    label: "Word Document",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "TXT",
    extension: "txt",
    label: "Plain Text",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "JSON",
    extension: "json",
    label: "JSON Data",
    icon: <FileJson className="h-4 w-4" />,
  },
];

export function DownloadButtons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {formats.map((format, index) => (
        <React.Fragment key={format.extension}>
          {index > 0 && <div className="text-muted-foreground mx-1">•</div>}
          <DownloadLink format={format} />
        </React.Fragment>
      ))}
    </div>
  );
}

function DownloadLink(props: {
  format: {
    name: string;
    extension: string;
    label: string;
    icon: ReactNode;
  };
}) {
  const downloadUrl = `/api/resume.${props.format.extension}`;

  return (
    <Link
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5"
    >
      {props.format.icon}
      <span>{props.format.name}</span>
    </Link>
  );
}
