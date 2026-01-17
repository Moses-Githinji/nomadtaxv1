import { useState } from "react";
import { Upload, FileCheck, FileX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  status: "validating" | "verified" | "invalid";
}

export function EtimsUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = () => {
    // Simulate file selection
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: `KRA-Receipt-${Math.floor(Math.random() * 1000)}.pdf`,
      status: "validating",
    };

    setFiles((prev) => [newFile, ...prev]);

    // Simulate validation
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id
            ? { ...f, status: Math.random() > 0.2 ? "verified" : "invalid" }
            : f
        )
      );
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
          isDragOver
            ? "border-nomad-green bg-nomad-green/10"
            : "border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleFileUpload(); }}
        onClick={handleFileUpload}
      >
        <div className="p-4 rounded-full bg-slate-800 text-nomad-green mb-4">
            <Upload size={24} />
        </div>
        <h3 className="text-lg font-semibold text-white">Upload eTIMS Receipt</h3>
        <p className="text-slate-400 text-sm mt-1 text-center">
          Drag & drop or Click to browse. <br />
          We validate QR codes instantly.
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Recent Uploads</h4>
            <div className="space-y-2">
                {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="text-slate-400">
                                {file.name}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {file.status === "validating" && (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full">
                                    <Loader2 size={12} className="animate-spin" /> Validating
                                </span>
                            )}
                            {file.status === "verified" && (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-nomad-green bg-nomad-green/10 px-2.5 py-1 rounded-full">
                                    <FileCheck size={12} /> Verified
                                </span>
                            )}
                            {file.status === "invalid" && (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full">
                                    <FileX size={12} /> Invalid
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
