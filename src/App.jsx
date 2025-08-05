import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";



function App() {
 return (
   <div className="flex min-h-screen flex-col">
     <Header />
     <main className="flex-1">
       <HeroSection />
       <FeaturesSection />
       <HowItWorksSection />
       <CTASection />
     </main>
     <Footer />
   </div>
 );
}

export default App;
