import { Heart, Code } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-cyan-500/20 bg-slate-900/80 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>and</span>
            <Code className="w-4 h-4 text-cyan-400" />
            <span>by Luis Charro</span>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span>Powered by OpenAI & Supabase</span>
            <span>2</span>
            <span>Built with Next.js 15</span>
            <span>2</span>
            <span>Daily updates via GitHub Actions</span>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            <p> a9 2024 AI News Daily. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}