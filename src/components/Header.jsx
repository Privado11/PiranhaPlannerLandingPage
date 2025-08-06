import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

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
    e.preventDefault();
    closeMobileMenu();
    setIsScrolling(true);

    if (targetId === "top") {
      window.history.pushState(null, null, window.location.pathname);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.history.pushState(null, null, `#${targetId}`);
      setActiveSection(targetId);

      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 10;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 50);
    }
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = ["features", "how-it-works"];
      const headerHeight = 80;
      const scrollPosition = window.scrollY + headerHeight + 100;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (window.scrollY < 100) {
          setActiveSection("");
          if (window.location.hash) {
            window.history.pushState(null, null, window.location.pathname);
          }
          return;
        }

        let newActiveSection = "";

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = window.scrollY + rect.top;
            const elementBottom = elementTop + element.offsetHeight;

            if (
              scrollPosition >= elementTop &&
              scrollPosition < elementBottom
            ) {
              newActiveSection = sectionId;
              break;
            }
          }
        }

        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);

          const newHash = newActiveSection ? `#${newActiveSection}` : "";
          if (window.location.hash !== newHash) {
            window.history.pushState(
              null,
              null,
              newActiveSection
                ? `#${newActiveSection}`
                : window.location.pathname
            );
          }
        }
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeSection, isScrolling]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && !isScrolling) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection("");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isScrolling]);

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
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-500 ease-out">
        <div className="container flex h-20 items-center justify-between">
          <div
            className="flex items-center gap-2 font-bold text-xl group cursor-pointer"
            onClick={(e) => handleSmoothScroll(e, "top")}
          >
            <span className="text-blue-600 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12"></span>
            <span className="transition-colors duration-300 ease-in-out group-hover:text-blue-600">
              {t("common.brandName")}
            </span>
          </div>

          <nav className="hidden md:flex gap-8">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className={`text-sm font-medium relative transition-all duration-500 ease-out cursor-pointer group ${
                isActive("features")
                  ? "text-blue-600 after:w-full after:opacity-100"
                  : "hover:text-blue-600 after:w-0 hover:after:w-full after:opacity-0 hover:after:opacity-100"
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-600 after:transition-all after:duration-500 after:ease-out after:transform after:origin-left`}
            >
              <span className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
                {t("header.nav.features")}
              </span>
            </a>

            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "how-it-works")}
              className={`text-sm font-medium relative transition-all duration-500 ease-out cursor-pointer group ${
                isActive("how-it-works")
                  ? "text-blue-600 after:w-full after:opacity-100"
                  : "hover:text-blue-600 after:w-0 hover:after:w-full after:opacity-0 hover:after:opacity-100"
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-600 after:transition-all after:duration-500 after:ease-out after:transform after:origin-left`}
            >
              <span className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
                {t("header.nav.howItWorks")}
              </span>
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 ease-out hover:scale-105 cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              <Globe className="mr-1 h-4 w-4 relative z-10 transition-transform duration-300 ease-out group-hover:rotate-180" />
              <span className="text-xs font-medium relative z-10">
                {i18n.language === "es" ? "EN" : "ES"}
              </span>
            </Button>

            <a
              href={t("header.auth.signIn.link")}
              className="text-sm font-medium relative transition-all duration-300 ease-out hover:text-blue-600 hover:-translate-y-1 group after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 after:ease-out hover:after:w-full"
            >
              <span className="transition-transform duration-300 ease-out group-hover:scale-105">
                {t("header.auth.signIn.label")}
              </span>
            </a>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30 active:scale-95 cursor-pointer relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              <a href={t("header.auth.signUp.link")} className="relative z-10">
                {t("header.auth.signUp.label")}
              </a>
            </Button>
          </div>

          <Button
            onClick={toggleMobileMenu}
            variant="ghost"
            size="sm"
            className="md:hidden p-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 ease-out relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded"></div>
            <div className="relative z-10 transition-transform duration-300 ease-out">
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 rotate-90 group-hover:rotate-180 transition-transform duration-300 ease-out" />
              ) : (
                <Menu className="h-5 w-5 group-hover:scale-110 transition-transform duration-300 ease-out" />
              )}
            </div>
          </Button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 ease-out"
            onClick={closeMobileMenu}
          />

          <div className="relative bg-white/95 backdrop-blur border-b shadow-2xl animate-in slide-in-from-top-4 duration-500 ease-out">
            <div className="container py-8 space-y-8">
              <nav className="space-y-6">
                <a
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, "features")}
                  className={`block text-lg font-medium transition-all duration-300 ease-out hover:translate-x-2 group ${
                    isActive("features")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-1 h-6 bg-blue-600 mr-3 transition-all duration-300 ease-out ${
                        isActive("features")
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                    <span className="transition-transform duration-300 ease-out group-hover:scale-105">
                      {t("header.nav.features")}
                    </span>
                  </div>
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleSmoothScroll(e, "how-it-works")}
                  className={`block text-lg font-medium transition-all duration-300 ease-out hover:translate-x-2 group ${
                    isActive("how-it-works")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-1 h-6 bg-blue-600 mr-3 transition-all duration-300 ease-out ${
                        isActive("how-it-works")
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                    <span className="transition-transform duration-300 ease-out group-hover:scale-105">
                      {t("header.nav.howItWorks")}
                    </span>
                  </div>
                </a>
              </nav>

              <div className="border-t border-gray-200/50" />

              <Button
                onClick={toggleLanguage}
                variant="ghost"
                className="w-full justify-start text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-300 ease-out hover:translate-x-1 group"
              >
                <Globe className="mr-3 h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-180" />
                <span className="text-base font-medium">
                  {i18n.language === "es" ? "English" : "Español"}
                </span>
              </Button>

              <div className="space-y-4">
                <a
                  href={t("header.auth.signIn.link")}
                  onClick={closeMobileMenu}
                  className="block w-full text-center py-4 text-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-out border border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10 hover:-translate-y-1"
                >
                  {t("header.auth.signIn.label")}
                </a>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-4 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-1 active:translate-y-0"
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
