import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("");

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "es" ? "en" : "es";
    i18n.changeLanguage(newLanguage);
  };

  const handleSmoothScroll = (e, targetId) => {
    if (targetId === "top") {
      window.history.pushState(null, null, window.location.pathname);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 0);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "how-it-works"];
      const scrollPosition = window.scrollY + 100;

      if (window.scrollY < 50) {
        setActiveSection("");

        if (window.location.hash) {
          window.history.pushState(null, null, window.location.pathname);
        }
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(sectionId);

            if (window.location.hash !== `#${sectionId}`) {
              window.history.pushState(null, null, `#${sectionId}`);
            }
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isActive = (sectionId) => activeSection === sectionId;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-300 ease-in-out">
      <div className="container flex h-16 items-center justify-between">
        <div
          className="flex items-center gap-2 font-bold text-xl group cursor-pointer"
          onClick={(e) => handleSmoothScroll(e, "top")}
        >
          <span className="text-blue-600 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12"></span>
          <span className="transition-colors duration-300 ease-in-out group-hover:text-blue-600">
            {t("common.brandName")}
          </span>
        </div>

        <nav className="hidden md:flex gap-6">
          <a
            href="#features"
            onClick={(e) => handleSmoothScroll(e, "features")}
            className={`text-sm font-medium relative transition-all duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer ${
              isActive("features")
                ? "text-blue-600 after:w-full"
                : "hover:text-blue-600 after:w-0 hover:after:w-full"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 after:ease-in-out`}
          >
            {t("header.nav.features")}
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, "how-it-works")}
            className={`text-sm font-medium relative transition-all duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer ${
              isActive("how-it-works")
                ? "text-blue-600 after:w-full"
                : "hover:text-blue-600 after:w-0 hover:after:w-full"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 after:ease-in-out`}
          >
            {t("header.nav.howItWorks")}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="sm"
            className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
          >
            <Globe className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">
              {i18n.language === "es" ? "EN" : "ES"}
            </span>
          </Button>

          <a
            href={t("header.auth.signIn.link")}
            className="text-sm font-medium relative transition-all duration-300 ease-in-out hover:text-blue-600 hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
          >
            {t("header.auth.signIn.label")}
          </a>
          <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 cursor-pointer">
            <a href={t("header.auth.signUp.link")}>
              {t("header.auth.signUp.label")}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
