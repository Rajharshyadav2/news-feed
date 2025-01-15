import { Button } from "./components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { NewsList } from "./components/NewsList";
import { SearchBar } from "./components/SerachBar";
import { ArticleFilters } from "./components/Filters";
import { PreferencesModal } from "./components/PreferencesModal";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export default function NewsFeed() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col items-center space-y-6">
          <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            News Feed
          </h1>

          <div className="w-full flex max-w-2xl gap-4 mx-auto">
            <div className="w-full">
              <SearchBar />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <ArticleFilters />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full flex max-w-2xl gap-4 mx-auto">
          <Tabs defaultValue="all-news" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="all-news">All News</TabsTrigger>
                <TabsTrigger value="personalized">For You</TabsTrigger>
              </TabsList>
              <PreferencesModal />
            </div>

            <TabsContent value="all-news" className="mt-6">
              <div className="rounded-lg bg-background p-12 text-center shadow-sm">
                <NewsList />
              </div>
            </TabsContent>

            <TabsContent value="personalized" className="mt-6">
              <div className="rounded-lg bg-background p-12 text-center shadow-sm">
                <NewsList isPersonalized />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
