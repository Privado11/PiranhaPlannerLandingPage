import { useTranslation } from "react-i18next";
import {
  CheckCircle,
  Upload,
  Share2,
  MessageSquare,
  Clock,
  Users,
} from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { AnimatedCard } from "./AnimatedCard";
import { FeatureCard } from "./FeatureCard";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = t("features.items", { returnObjects: true });

  const iconMap = {
    CheckCircle: CheckCircle,
    Upload: Upload,
    Share2: Share2,
    MessageSquare: MessageSquare,
    Clock: Clock,
    Users: Users,
  };

  return (
    <AnimatedSection id="features" className="bg-gray-50 py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("features.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            {t("features.subtitle")}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <AnimatedCard key={index} delay={feature.delay}>
                <FeatureCard
                  icon={<IconComponent className="h-10 w-10 text-blue-600" />}
                  title={feature.title}
                  description={feature.description}
                />
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
