import { toast } from "sonner";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Source, Category } from "../types";
import * as Dialog from "@radix-ui/react-dialog";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export function PreferencesModal() {
  const [open, setOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>(() => {
    const savedSources = localStorage.getItem("preferredSources");
    return savedSources ? JSON.parse(savedSources) : [];
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem("preferredCategories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const handleSave = () => {
    localStorage.setItem("preferredSources", JSON.stringify(selectedSources));
    localStorage.setItem(
      "preferredCategories",
      JSON.stringify(selectedCategories)
    );

    toast.success("Preferences saved successfully");
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Customize Feed</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        {/* Modal Content */}
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center p-4"
          onInteractOutside={() => setOpen(false)} // Close on click outside
          onEscapeKeyDown={() => setOpen(false)} // Close on Escape key press
        >
          <div className="relative w-[50vw] max-h-[80vh] bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg overflow-y-auto">
            {/* Cross Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <h2 className="text-lg font-bold mb-4">Customize Preferences</h2>
            <div className="grid gap-4">
              {/* Preferred Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferred Sources</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(Source).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`source-${value}`}
                        checked={selectedSources.includes(value)}
                        onCheckedChange={(checked) =>
                          setSelectedSources((prev) =>
                            checked
                              ? [...prev, value]
                              : prev.filter((s) => s !== value)
                          )
                        }
                      />
                      <label
                        htmlFor={`source-${key}`}
                        className="text-sm font-medium"
                      >
                        {key}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Preferred Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferred Categories</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(Category).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${value}`}
                        checked={selectedCategories.includes(value)}
                        onCheckedChange={(checked) =>
                          setSelectedCategories((prev) =>
                            checked
                              ? [...prev, value]
                              : prev.filter((c) => c !== value)
                          )
                        }
                      />
                      <label
                        htmlFor={`category-${key}`}
                        className="text-sm font-medium"
                      >
                        {key}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Save Button */}
            <Button onClick={handleSave} className="w-full mt-4">
              Save Preferences
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
