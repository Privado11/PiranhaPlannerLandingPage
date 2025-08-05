import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "./AnimatedSection";


export default function CTASection() {
  const { t } = useTranslation();

  return (
    <AnimatedSection className="py-20 bg-blue-600 text-white">
      <div className="container flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{t("cta.title")}</h2>
        <p className="mt-6 max-w-2xl text-blue-100">{t("cta.subtitle")}</p>
        <Button
          size="lg"
          className="mt-10 bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-transform cursor-pointer"
        >
          <a href={t("header.auth.signUp.link")}>{t("cta.button")}</a>
        </Button>
      </div>
    </AnimatedSection>
  );
}
