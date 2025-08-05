import { useTranslation } from "react-i18next";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

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

  return (
    <footer className="border-t bg-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="group flex items-center gap-2 font-bold text-xl mb-4 md:mb-0 cursor-pointer">
            <span className="text-blue-600 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12"></span>
            <span className="transition-colors duration-300 ease-in-out group-hover:text-blue-600">
              {t("common.brandName")}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t("footer.links.terms")}
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t("footer.links.privacy")}
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t("footer.links.contact")}
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {year} {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
