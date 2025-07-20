import { Bot, Github, Twitter } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="relative z-20 border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI News Daily</h1>
              <p className="text-xs text-cyan-400">Powered by AI</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href="https://github.com/LuisCharro/ai-news-daily"
              target="_blank"
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}