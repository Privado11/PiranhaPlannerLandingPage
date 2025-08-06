import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "es" ? "en" : "es";
    i18n.changeLanguage(newLanguage);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (e, targetId) => {
    closeMobileMenu();

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const isActive = (sectionId) => activeSection === sectionId;

  return (
    <>
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

          <div className="hidden md:flex items-center gap-4">
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

          <Button
            onClick={toggleMobileMenu}
            variant="ghost"
            size="sm"
            className="md:hidden p-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 ease-in-out"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={closeMobileMenu}
          />

          <div className="relative bg-white border-b shadow-lg animate-in slide-in-from-top-4 duration-300">
            <div className="container py-6 space-y-6">
              <nav className="space-y-4">
                <a
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, "features")}
                  className={`block text-lg font-medium transition-all duration-300 ease-in-out ${
                    isActive("features")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {t("header.nav.features")}
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleSmoothScroll(e, "how-it-works")}
                  className={`block text-lg font-medium transition-all duration-300 ease-in-out ${
                    isActive("how-it-works")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {t("header.nav.howItWorks")}
                </a>
              </nav>

              <div className="border-t border-gray-200" />

              <Button
                onClick={toggleLanguage}
                variant="ghost"
                className="w-full justify-start text-left hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 ease-in-out"
              >
                <Globe className="mr-3 h-5 w-5" />
                <span className="text-base font-medium">
                  {i18n.language === "es" ? "English" : "Español"}
                </span>
              </Button>

              <div className="space-y-3">
                <a
                  href={t("header.auth.signIn.link")}
                  onClick={closeMobileMenu}
                  className="block w-full text-center py-3 text-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out border border-gray-200 rounded-lg hover:border-blue-600"
                >
                  {t("header.auth.signIn.label")}
                </a>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-600/25"
                  onClick={closeMobileMenu}
                >
                  <a
                    href={t("header.auth.signUp.link")}
                    className="block w-full"
                  >
                    {t("header.auth.signUp.label")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
