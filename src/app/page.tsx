"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Cloud,
  Shield,
  Zap,
  Globe,
  Server,
  Lock,
  ArrowRight,
  Check,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Highlight } from "@/components/ui/hero-highlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { title } from "process";
import { Link } from "next-view-transitions";
export default function LandingPage() {
  const t = useTranslations("landing");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: Shield,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
    {
      icon: Zap,
      title: t("features.performance.title"),
      description: t("features.performance.description"),
    },
    {
      icon: Globe,
      title: t("features.global.title"),
      description: t("features.global.description"),
    },
    {
      icon: Server,
      title: t("features.scalable.title"),
      description: t("features.scalable.description"),
    },
    {
      icon: Lock,
      title: t("features.backup.title"),
      description: t("features.backup.description"),
    },
    {
      icon: Cloud,
      title: t("features.support.title"),
      description: t("features.support.description"),
    },
  ];

  const plans = [
    {
      name: t("pricing.starter.name"),
      price: t("pricing.starter.price"),
      description: t("pricing.starter.description"),
      features: [
        t("pricing.starter.features.storage"),
        t("pricing.starter.features.bandwidth"),
        t("pricing.starter.features.domains"),
        t("pricing.starter.features.support"),
      ],
    },
    {
      name: t("pricing.pro.name"),
      price: t("pricing.pro.price"),
      description: t("pricing.pro.description"),
      popular: true,
      features: [
        t("pricing.pro.features.storage"),
        t("pricing.pro.features.bandwidth"),
        t("pricing.pro.features.domains"),
        t("pricing.pro.features.ssl"),
        t("pricing.pro.features.support"),
      ],
    },
    {
      name: t("pricing.enterprise.name"),
      price: t("pricing.enterprise.price"),
      description: t("pricing.enterprise.description"),
      features: [
        t("pricing.enterprise.features.storage"),
        t("pricing.enterprise.features.bandwidth"),
        t("pricing.enterprise.features.domains"),
        t("pricing.enterprise.features.dedicated"),
        t("pricing.enterprise.features.support"),
      ],
    },
  ];
  const testimonials = [];
  let index = 1;

  while (index <= parseInt(t("testimonials.tCount"))) {
    const testKey = `testimonials.t.${index}.quote`;
    t.rich(testKey);

    const testimonial = {
      quote: t(`testimonials.t.${index}.quote`),
      name: t(`testimonials.t.${index}.name`),
      title: t(`testimonials.t.${index}.title`),
    };
    testimonials.push(testimonial);
    index++;
  }

  return (
    <div className="min-h-screen transition-colors duration-500">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <BackgroundBeams />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/50 dark:bg-gray-900/50 border-b border-white/20 dark:border-gray-700/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Cloud className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SHD Cloud
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t("nav.features")}
              </a>
              <a
                href="#pricing"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t("nav.pricing")}
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t("nav.contact")}
              </a>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                {t("nav.getStarted")}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-lg backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/20">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          SHD Cloud
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2"
                      ></Button>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4 py-4">
                    <a
                      href="#features"
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.features")}
                    </a>
                    <a
                      href="#pricing"
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.pricing")}
                    </a>
                    <a
                      href="#contact"
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.contact")}
                    </a>
                    <div className="px-4 pt-2">
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t("nav.getStarted")}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Mobile Menu */}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 mt-60"
              variants={fadeInUp}
            >
              <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Link href="/dashboard">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button className="relative overflow-hidden rounded-[2rem] min-w-[260px] h-[5.5rem] bg-white/[0.015] dark:bg-white/[0.005] backdrop-blur-[6px] border border-white/[0.04] dark:border-white/[0.02] hover:bg-white/[0.03] dark:hover:bg-white/[0.015] text-gray-800 dark:text-gray-100 px-14 py-7 text-lg group cursor-pointer shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] transition-all duration-500 ease-in-out">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-white/[0.002] dark:from-white/[0.025] dark:via-white/[0.008] dark:to-white/[0.001] rounded-[2rem] backdrop-blur-[4px]" />

                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent dark:via-white/[0.015] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105" />

                    <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/[0.04] dark:border-white/[0.02] shadow-inner" />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent dark:via-white/[0.04] w-[120%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out rounded-[2rem] transform -skew-x-12" />

                    <div className="absolute top-3 left-6 w-2 h-2 bg-white/[0.06] dark:bg-white/[0.04] rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                    <div
                      className="absolute bottom-4 right-8 w-3 h-3 bg-white/[0.04] dark:bg-white/[0.025] rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.02] via-transparent to-white/[0.01] dark:from-white/[0.012] dark:to-white/[0.005] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-1" />

                    <div className="relative z-20 flex items-center justify-center gap-4">
                      <span className="text-xl font-medium tracking-wide text-gray-900 dark:text-gray-50 group-hover:text-gray-950 dark:group-hover:text-white transition-all duration-300 drop-shadow-lg">
                        {t("hero.cta")}
                      </span>
                      <ArrowRight className="h-6 w-6 text-gray-800 dark:text-gray-100 group-hover:translate-x-3 group-hover:scale-110 group-hover:text-gray-950 dark:group-hover:text-white transition-all duration-400 ease-out drop-shadow-lg" />
                    </div>

                    <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent dark:from-white/[0.015] dark:via-white/[0.005] dark:to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 -z-10 transform group-hover:scale-110" />

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      <div
                        className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/[0.1] rounded-full animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <div
                        className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/[0.08] rounded-full animate-ping"
                        style={{ animationDelay: "1s" }}
                      />
                    </div>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 mt-60">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="md:text-4xl text-3xl font-bold text-gray-900 dark:text-white mb-4">
              <Highlight className="p-2">{t("features.title")}</Highlight>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Testimonials Section InfiniteMovingCards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </motion.div>

          <InfiniteMovingCards speed="fast" items={testimonials} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("pricing.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {plans.map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`h-full backdrop-blur-md border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col ${
                    plan.popular
                      ? "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 ring-2 ring-blue-500 dark:ring-blue-400"
                      : "bg-white/80 dark:bg-gray-800/80"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                      {t("pricing.popular")}
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <ul className="space-y-3 min-h-[200px]">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 mt-auto">
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                            : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        {t("pricing.chooseplan")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-xl mb-8 opacity-90">{t("cta.subtitle")}</p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                {t("cta.button")}
              </Button>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="py-12 px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-t border-white/20 dark:border-gray-700/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Cloud className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SHD Cloud
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("footer.description")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t("footer.company")}
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("footer.about")}</li>
                <li>{t("footer.careers")}</li>
                <li>{t("footer.contact")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t("footer.support")}
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("footer.help")}</li>
                <li>{t("footer.docs")}</li>
                <li>{t("footer.status")}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
            <p>© 2025 SHD Cloud. {t("footer.rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
