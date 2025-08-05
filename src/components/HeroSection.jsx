import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "./AnimatedSection";
import HeroImageEnMobile from "../assets/HeroImageEnMobile.png";
import HeroImageEsMobile from "../assets/HeroImageEsMobile.png";
import HeroImageEnTablet from "../assets/HeroImageEnTablet.png";
import HeroImageEsTablet from "../assets/HeroImageEsTablet.png";
import HeroImageEnPC from "../assets/HeroImageEnPC.png";
import HeroImageEsPC from "../assets/HeroImageEsPC.png";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function HeroSection() {
  const { t } = useTranslation();
  const [heroImage, setHeroImage] = useState("");

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const isSpanish = t("hero.image") === "HeroImageEs";

    let selectedImage;
    if (isMobile) {
      selectedImage = isSpanish ? HeroImageEsMobile : HeroImageEnMobile;
    } else if (isTablet) {
      selectedImage = isSpanish ? HeroImageEsTablet : HeroImageEnTablet;
    } else {
      selectedImage = isSpanish ? HeroImageEsPC : HeroImageEnPC;
    }

    setHeroImage(selectedImage);
  }, [isMobile, isTablet, isDesktop, t]);

  return (
    <AnimatedSection className="py-20 md:py-28">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {t("hero.title")} <br />
          <span className="text-blue-600">{t("common.brandName")}</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-600">
          {t("hero.subtitle")}
          <span className="font-semibold"> {t("hero.subtitle2")}</span>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform cursor-pointer"
          >
            {t("hero.cta.primary")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
        </div>
        <div className="mt-16 w-full max-w-6xl">
          <div className="rounded-lg border bg-white/50 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden">
            <img
              src={heroImage}
              alt={t("hero.imageAlt")}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
