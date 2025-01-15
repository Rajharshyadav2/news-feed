import { Category, Source } from "../types";
import { getNews } from "../services/news";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface UseFetchNewsProps {
  isPersonalized?: boolean;
}

/**
 * Custom hook to fetch news articles based on query parameters and personalization settings.
 * @param {boolean} [isPersonalized=false] - Flag indicating whether to fetch personalized news.
 * @returns {Object} - React Query result containing news data, loading, or error state.
 */
export function useFetchNews({ isPersonalized = false }: UseFetchNewsProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const searchQuery = searchParams.get("q") || "any";
  const selectedDate = searchParams.get("date")
    ? new Date(searchParams.get("date")!)
    : undefined;
  const selectedCategory = searchParams.get("category") as Category | undefined;
  const selectedSource = searchParams.get("source") as Source | undefined;

  const fetchNews = () =>
    getNews({
      query: searchQuery,
      date: selectedDate,
      category: selectedCategory,
      source: selectedSource,
      personalized: isPersonalized,
    });

  return useQuery({
    queryKey: [
      "news",
      searchQuery,
      selectedDate,
      selectedCategory,
      selectedSource,
      isPersonalized,
    ],
    queryFn: fetchNews,
    staleTime: 0, // Disable caching to fetch the latest data
    gcTime: 0, // Disable garbage collection for query data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
