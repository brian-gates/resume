import { Check, ChevronDown, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

type Format = {
  name: string;
  extension: string;
  label: string;
};

const formats: Format[] = [
  { name: "PDF", extension: "pdf", label: "PDF Document" },
  { name: "DOCX", extension: "docx", label: "Word Document" },
  { name: "TXT", extension: "txt", label: "Plain Text" },
  { name: "JSON", extension: "json", label: "JSON Data" },
];

export function DownloadButton() {
  const [selectedFormat, setSelectedFormat] = useState<Format>(formats[0]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Direct link to the pre-generated static file
      const fileUrl = `/downloads/brian-gates-resume.${selectedFormat.extension}`;

      // Create a link element and trigger the download
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = `brian-gates-resume.${selectedFormat.extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleDownload}
        className="flex items-center gap-1.5"
        disabled={isDownloading}
      >
        <Download className="h-4 w-4" />
        {isDownloading ? "Downloading..." : "Download Resume"}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            <span className="sr-only">Select format</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {formats.map((format) => (
            <DropdownMenuItem
              key={format.extension}
              onClick={() => setSelectedFormat(format)}
              className={cn(
                "flex items-center gap-2",
                selectedFormat.extension === format.extension && "font-medium"
              )}
            >
              {selectedFormat.extension === format.extension && (
                <Check className="h-4 w-4" />
              )}
              <span>{format.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
