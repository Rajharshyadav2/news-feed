import { News } from "../types";
import { useState } from "react";
import { format } from "date-fns";
import { ExternalLink, Share2, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.description,
          url: news.url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const timeAgo = () => {
    const now = new Date();
    const publishedDate = new Date(news.publishedAt);
    const diffInHours = Math.floor(
      (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    return format(publishedDate, "MMMM dd, yyyy");
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-grow">
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors cursor-pointer">
              {news.title}
            </CardTitle>
          </div>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 ml-2 flex-shrink-0"
            aria-label="Share article"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <div
          className={`transition-all duration-300 ${
            isExpanded ? "max-h-full" : "max-h-24 overflow-hidden"
          }`}
        >
          <p className="text-gray-600 leading-relaxed">
            {isExpanded
              ? news.description
              : truncateDescription(news.description, 200)}
          </p>
          {news.description.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 mt-2">
        <div className="flex items-center justify-between w-full text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{timeAgo()}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">By {news.author}</span>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
            >
              Read full article
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
