import { useTranslation } from "react-i18next";
import { AnimatedCard } from "./AnimatedCard";
import { AnimatedSection } from "./AnimatedSection";
import { StepCard } from "./StepCard";


export default function HowItWorksSection() {
  const { t } = useTranslation();

   const steps = t("howItWorks.steps", { returnObjects: true });
   
  return (
    <AnimatedSection id="how-it-works" className="py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("howItWorks.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            {t("howItWorks.subtitle")}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimatedCard key={index} delay={step.delay}>
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </AnimatedCard>
          ))}
        </div>
       
      </div>
    </AnimatedSection>
  );
}
