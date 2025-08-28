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
  Users,
  Trophy,
  Clock,
  Star,
  ChevronDown,
  TrendingUp,
  Sparkles as SparklesIcon,
  Award,
  Layers,
  Twitter,
  Github,
  MessageCircle,
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
import { SparklesCore } from "@/components/ui/sparkles";
import { Meteors } from "@/components/ui/meteors";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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

  const featureKeys = [
    "security",
    "performance",
    "global",
    "scalable",
    "backup",
    "support",
  ];
  const icons = [Shield, Zap, Globe, Server, Lock, Cloud];
  const colors = [
    "from-purple-500 to-indigo-500",
    "from-orange-500 to-red-500",
    "from-blue-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-amber-500 to-yellow-500",
    "from-cyan-500 to-blue-500",
  ];

  const features = featureKeys.map((key, index) => {
    const detailCount = parseInt(t(`features.${key}.dCount`));

    const details: string[] = [];
    for (let detailIndex = 1; detailIndex <= detailCount; detailIndex++) {
      const detail = t(`features.${key}.details.${detailIndex}`);
      details.push(detail);
    }

    return {
      icon: icons[index],
      title: t(`features.${key}.title`),
      description: t(`features.${key}.description`),
      details: details,
      color: colors[index],
    };
  });

  const stats = [
    {
      number: "90%",
      label: t("stats.uptime"),
      icon: TrendingUp,
    },
    {
      number: "1.9K+",
      label: t("stats.customers"),
      icon: Users,
    },
    {
      number: "2+",
      label: t("stats.locations"),
      icon: Globe,
    },
    {
      number: "12/7",
      label: t("stats.support"),
      icon: Clock,
    },
  ];

  const faqs = [
    {
      question: t("faq.questions.hosting.question"),
      answer: t("faq.questions.hosting.answer"),
    },
    {
      question: t("faq.questions.upgrade.question"),
      answer: t("faq.questions.upgrade.answer"),
    },
    {
      question: t("faq.questions.support.question"),
      answer: t("faq.questions.support.answer"),
    },
    {
      question: t("faq.questions.guarantee.question"),
      answer: t("faq.questions.guarantee.answer"),
    },
  ];

  const plans = [];
  let planIndex = 1;

  while (planIndex <= parseInt(t("pricing.pCount"))) {
    const planKey = `pricing.plans.${planIndex}`;

    const featureCount = parseInt(t(`${planKey}.fCount`));

    const features: string[] = [];

    for (let featureIndex = 1; featureIndex <= featureCount; featureIndex++) {
      const featureText = t(`${planKey}.features.${featureIndex}`);
      features.push(featureText);
    }

    const plan = {
      name: t(`${planKey}.name`),
      price: t(`${planKey}.price`),
      description: t(`${planKey}.description`),
      popular: t(`${planKey}.popular`) === "true",
      features: features,
    };
    plans.push(plan);
    planIndex++;
  }
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
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-zinc-900/80 dark:bg-zinc-950/90 border-b border-zinc-800/50 dark:border-zinc-700/50 shadow-lg shadow-zinc-900/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Cloud className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SHD Cloud
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm"
              >
                {t("nav.features")}
              </a>
              <a
                href="#pricing"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm"
              >
                {t("nav.pricing")}
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm"
              >
                {t("nav.contact")}
              </a>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                {t("nav.getStarted")}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-zinc-800 dark:hover:bg-zinc-800"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] rounded-2xl backdrop-blur-xl bg-zinc-900/90 dark:bg-zinc-950/95 border border-zinc-800/50 dark:border-zinc-700/50 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <Cloud className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          SHD Cloud
                        </span>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-3 py-4">
                    <a
                      href="#features"
                      className="px-4 py-3 text-zinc-300 dark:text-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-800 rounded-xl transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.features")}
                    </a>
                    <a
                      href="#pricing"
                      className="px-4 py-3 text-zinc-300 dark:text-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-800 rounded-xl transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.pricing")}
                    </a>
                    <a
                      href="#contact"
                      className="px-4 py-3 text-zinc-300 dark:text-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-800 rounded-xl transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.contact")}
                    </a>
                    <div className="px-4 pt-3">
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full py-3 font-medium shadow-lg"
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
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#3b82f6"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="flex justify-center mb-8"
              variants={fadeInUp}
            >
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-md border-white/20 text-gray-800 dark:text-gray-200"
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                {t("hero.badge")}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8"
              variants={fadeInUp}
            >
              <span className="text-gray-900 dark:text-white">
                {t("hero.title.prefix")}{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                {t("hero.title.highlight")}
              </span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              variants={fadeInUp}
            >
              <Link href="/dashboard">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button className="relative overflow-hidden rounded-2xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold shadow-2xl group">
                    <span className="relative z-10 flex items-center gap-3">
                      {t("hero.cta")}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
              </Link>

              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button className="relative overflow-hidden rounded-2xl px-12 py-6 bg-white hover:bg-gray-100 text-gray-900 text-lg font-semibold shadow-2xl group">
                  <span className="relative z-10 flex items-center gap-3">
                    {t("hero.joinGroup")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{t("hero.indicators.security")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{t("hero.indicators.uptime")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{t("hero.indicators.support")}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-zinc-900/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-3xl p-12 border border-zinc-800/50 dark:border-zinc-700/50 shadow-sm"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-800 dark:bg-zinc-800 rounded-2xl mb-4 group-hover:scale-105 transition-transform">
                    <stat.icon className="w-6 h-6 text-blue-400 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100 dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-zinc-300 dark:text-zinc-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <Highlight className="px-2">{t("features.title")}</Highlight>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("features.subtitle")}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-zinc-900/90 dark:bg-zinc-950/90 backdrop-blur-sm border border-zinc-800/60 dark:border-zinc-700/60 hover:shadow-lg transition-all duration-300 group rounded-2xl">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-zinc-100 dark:text-white mb-2">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-zinc-300 dark:text-zinc-400 text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-center text-xs text-gray-500 dark:text-gray-500"
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-zinc-900/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-3xl p-12 border border-zinc-800/50 dark:border-zinc-700/50 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("testimonials.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("testimonials.subtitle")}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <InfiniteMovingCards
                speed="fast"
                items={testimonials.map((testimonial) => ({
                  ...testimonial,
                }))}
              />
            </div>
          </motion.div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("pricing.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                  className={`h-full backdrop-blur-md border-zinc-800/20 dark:border-zinc-700/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group ${
                    plan.popular
                      ? "bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-zinc-950 ring-2 ring-blue-500 dark:ring-blue-400 scale-105"
                      : "bg-zinc-900/90 dark:bg-zinc-950/90 hover:scale-105"
                  }`}
                >
                  {plan.popular && (
                    <>
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-medium rounded-bl-xl">
                        <Trophy className="w-4 h-4 inline mr-1" />
                        {t("pricing.popular")}
                      </div>
                      <Meteors number={5} className="opacity-30" />
                    </>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </CardTitle>
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.price}
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow flex flex-col justify-between px-8">
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                    >
                      {t("pricing.chooseplan")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              {t("pricing.guarantee")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-zinc-900/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-3xl p-12 border border-zinc-800/50 dark:border-zinc-700/50 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("faq.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t("faq.subtitle")}
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-zinc-800/50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors cursor-pointer group text-left">
                        <h3 className="text-sm font-medium text-zinc-100 dark:text-white group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
                          {faq.question}
                        </h3>
                        <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-all duration-300 group-data-[state=open]:rotate-180 flex-shrink-0 ml-4" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4">
                        <div className="bg-zinc-800/50 dark:bg-zinc-800/50 rounded-lg p-4 mt-2">
                          <p className="text-zinc-300 dark:text-zinc-400 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {t("faq.stillHaveQuestions")}
              </p>
              <Button
                variant="outline"
                className="px-6 py-2 text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t("faq.contactSupport")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-zinc-900/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-3xl p-12 text-center border border-zinc-800/50 dark:border-zinc-700/50 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 px-3 py-1 text-xs bg-zinc-800 dark:bg-zinc-800 border-zinc-700 dark:border-zinc-700 text-zinc-300 dark:text-zinc-400"
            >
              <SparklesIcon className="w-3 h-3 mr-2" />
              {t("cta.badge")}
            </Badge>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("cta.title")}
            </h2>

            <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("cta.start")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-500" />
                <span>{t("cta.features.noFees")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-500" />
                <span>{t("cta.features.cancelAnytime")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-500" />
                <span>{t("cta.features.support")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-zinc-950/95 dark:bg-zinc-950/95 border-t border-zinc-800/50 dark:border-zinc-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SHD Cloud
                </span>
              </div>
              <p className="text-zinc-400 dark:text-zinc-300 mb-6 max-w-md leading-relaxed">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-4 w-4 text-zinc-400" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                >
                  <span className="sr-only">GitHub</span>
                  <Github className="h-4 w-4 text-zinc-400" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                >
                  <span className="sr-only">Discord</span>
                  <MessageCircle className="h-4 w-4 text-zinc-400" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-zinc-100 dark:text-white mb-6 text-lg">
                {t("footer.company")}
              </h3>
              <ul className="space-y-4 text-zinc-400 dark:text-zinc-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {t("footer.about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {t("footer.careers")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {t("footer.contact")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-zinc-100 dark:text-white mb-6 text-lg">
                {t("footer.support")}
              </h3>
              <ul className="space-y-4 text-zinc-400 dark:text-zinc-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {t("footer.help")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {t("footer.docs")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {t("footer.status")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="flex flex-col md:flex-row justify-between items-center text-zinc-400 dark:text-zinc-300">
            <p>© 2025 SHD Cloud. {t("footer.rights")}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors text-sm"
              >
                {t("footer.legal.privacy")}
              </a>
              <a
                href="#"
                className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors text-sm"
              >
                {t("footer.legal.terms")}
              </a>
              <a
                href="#"
                className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors text-sm"
              >
                {t("footer.legal.cookies")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
