import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, ExternalLink, Sparkles } from "lucide-react"
import ShareButton from "./share-button"

interface NewsItem {
  id: number
  title: string
  summary: string
  source?: string
  display_date: string
  created_at: string
}

interface NewsCardProps {
  news: NewsItem
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      <CardContent className="p-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-cyan-400/30 text-cyan-300 bg-cyan-400/10">
                <Sparkles className="w-3 h-3 mr-1" />
                AI News
              </Badge>
              <span className="text-gray-400 text-sm">{news.display_date}</span>
            </div>

            <h3 className="text-2xl font-bold text-white leading-tight">{news.title}</h3>

            <p className="text-gray-300 text-lg leading-relaxed">{news.summary}</p>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                {news.source && (
                  <>
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 text-sm font-medium">Source: {news.source}</span>
                  </>
                )}
              </div>
              <ShareButton 
                title={news.title}
                summary={news.summary}
                date={news.display_date}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}