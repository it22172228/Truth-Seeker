
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Link } from "react-router-dom";

const Header = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  const t = translations[language];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, we would implement the search functionality here
  };

  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold">TL</span>
            </div>
            <h1 className="text-xl font-bold">
              {t.appName}
            </h1>
          </Link>
        </div>

        <form 
          onSubmit={handleSearch}
          className="relative w-full max-w-md flex items-center"
        >
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon"
            className="absolute right-1"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">{t.search}</span>
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex gap-4">
            <Link to="/analytics">
              <Button variant="ghost" size="sm">Analytics</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          </nav>
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
