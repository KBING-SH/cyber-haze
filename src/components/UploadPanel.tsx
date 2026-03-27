import { useState, useRef, useCallback } from "react";
import { Upload, X, Check, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/LoginDialog";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SAMPLE_QUESTIONS = [
  {
    type: "text" as const,
    text: "A right triangle has legs measuring 3 cm and 4 cm. Find the length of the hypotenuse.",
  },
  {
    type: "text" as const,
    text: "Given an isosceles triangle with a base of 10 cm and equal sides of 13 cm each. Find the height and area.",
  },
  {
    type: "text" as const,
    text: "Solve for x: 2x² + 5x - 3 = 0",
  },
  {
    type: "text" as const,
    text: "Find the derivative of f(x) = 3x⁴ - 2x³ + 7x - 5",
  },
];

export function UploadPanel({
  onGenerate,
  externalStyleRef,
}: {
  onGenerate?: (problemText: string, ratio: string) => void;
  externalStyleRef?: React.MutableRefObject<((styleIndex: number) => void) | null>;
} = {}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [problemText, setProblemText] = useState("");
  const [activeTab, setActiveTab] = useState("file");
  const fileRef = useRef<HTMLInputElement>(null);

  // Keep the external ref interface for compatibility
  if (externalStyleRef) {
    externalStyleRef.current = () => {};
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setShowSuccess(true);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setShowSuccess(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleGetAnswer = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    if (onGenerate) {
      onGenerate(problemText || "math problem", "16:9");
    }
  };

  const handleSampleClick = (text: string) => {
    setProblemText(text);
    setActiveTab("file");
  };

  return (
    <div className="lg:rounded-none rounded-xl border border-border/50 lg:border-0 bg-muted shadow-soft lg:shadow-none h-full flex flex-col overflow-hidden">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-5 space-y-3 md:space-y-3 lg:space-y-4 text-sm">
        {/* Tabs: File / Canvas */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-muted/50 border border-border/50">
            <TabsTrigger value="file" className="text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              File
            </TabsTrigger>
            <TabsTrigger value="canvas" className="text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Canvas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="mt-3 space-y-3">
            {/* Two-column layout: Upload + Text input */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Upload area */}
              <div>
                <div id="upload-drop-zone" className="relative">
                  {uploadedImage ? (
                    <div className="relative rounded-lg border border-border/50 overflow-hidden animate-fade-in">
                      <img
                        src={uploadedImage}
                        alt="Uploaded problem"
                        className="w-full h-32 lg:h-44 object-contain bg-muted/20"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors"
                      >
                        <X className="w-3 h-3 text-background" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileRef.current?.click()}
                      className={cn(
                        "h-32 lg:h-44 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer",
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary"
                      )}
                    >
                      <Upload className="h-8 w-8 text-body-desc" />
                      <p className="text-xs text-body-desc text-center">
                        Drag and drop an <span className="text-primary font-medium">image</span> or <span className="text-primary font-medium">pdf</span>
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fileRef.current?.click();
                        }}
                        className="text-xs text-primary hover:text-primary/80 font-medium underline underline-offset-2"
                      >
                        Choose a file
                      </button>
                      <p className="text-[10px] text-body-desc/60">Files: Max 32MB</p>
                    </div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                  {showSuccess && (
                    <div className="flex items-center gap-1.5 mt-1 animate-fade-in">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-xs text-primary">Upload successful</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text input area */}
              <div>
                <textarea
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="Type the math problems..."
                  className="w-full h-32 lg:h-44 rounded-lg border border-border/50 bg-card px-3 py-2.5 text-sm text-title placeholder:text-body-desc resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="canvas" className="mt-3">
            <div className="rounded-lg border border-border/50 bg-card h-44 lg:h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Sparkles className="w-8 h-8 text-body-desc/40 mx-auto" />
                <p className="text-sm text-body-desc">Draw or write your math problem here</p>
                <p className="text-xs text-body-desc/60">Canvas mode coming soon</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Sample questions */}
        <div>
          <p className="text-xs font-medium text-body-desc mb-2">Try these questions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSampleClick(q.text)}
                className="text-left p-2.5 rounded-lg border border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 text-[10px] font-medium text-primary bg-primary/10 rounded px-1.5 py-0.5 mt-0.5">
                    text
                  </span>
                  <p className="text-xs text-body-desc group-hover:text-title leading-relaxed line-clamp-2 transition-colors">
                    {q.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom: Get Answer */}
      <div className="border-t border-border/50 p-3 md:p-4 lg:p-5">
        <Button
          variant="gradient"
          size="default"
          className="w-full"
          onClick={handleGetAnswer}
          disabled={!problemText && !uploadedImage}
        >
          Get Answer
        </Button>
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </div>
  );
}
