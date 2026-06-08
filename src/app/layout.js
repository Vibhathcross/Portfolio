import "./globals.css";

// High-fidelity SEO Metadata
export const metadata = {
  title: "Vibhath | Elite 3D WebGL Developer & Systems Architect",
  description: "Interactive 3D WebGL portfolio and systems development sandbox of Vibhath, specializing in Operating Systems, Database Management Systems, Networking, and AI engineering.",
  keywords: [
    "Vibhath", "Computer Science Kerala", "Systems Engineer", 
    "React Three Fiber", "3D WebGL Portfolio", "Awwwards Web Design", 
    "Idukki Engineer", "Supabase Developer"
  ],
  authors: [{ name: "Vibhath" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased min-h-full bg-[#030303] text-[#f5f5f7] font-sans selection:bg-cyan-500/30 selection:text-white">
        
        {/* Render pages inside clean HTML shell */}
        {children}
        
      </body>
    </html>
  );
}
