import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Link } from "next-view-transitions";
import { Zap, Lock, DollarSign, Check, ArrowRight, Rocket } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <BackgroundBeams className="absolute inset-0" />
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold md:hidden">SC</div>
          <div className="text-xl font-semibold hidden md:block">SHD Cloud</div>
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/docs">文檔</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="https://dc.shdctw.com">
                    社群
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/go/panel">面板</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link href="/dashboard">
              <Button
                variant="secondary"
                className="bg-secondary/50 hover:bg-sky-700/50"
              >
                儀表板
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-36 pb-24 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm bg-white/5 text-sm">
            {/* 嘻嘻 */}
            <span className="text-gray-400">蘿莉託管</span>
            <span className="text-green-400">
              <Check size={16} />
            </span>
          </div>

          <div className="h-48 md:h-60 w-full mx-auto flex items-center justify-center">
            <TextHoverEffect text="SHD CLOUD" duration={0.5} />
          </div>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            我們提供免費的雲端服務以及活躍的社群
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 py-8 px-12 text-xl group ring-blue-600/50 hover:ring-5 ring-offset-5 ring-offset-black transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Rocket
                    className="max-w-6 opacity-100 transition-all duration-300 group-hover:max-w-0 group-hover:opacity-0"
                    size={24}
                  />
                  開始使用
                  <ArrowRight
                    className="max-w-0 opacity-0 transition-all duration-300 group-hover:max-w-6 group-hover:opacity-100 group-hover:translate-x-1"
                    size={24}
                  />
                </span>
              </Button>
            </Link>
            <Link href="https://dc.shdctw.com">
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm bg-white/5 border-white/10 text-white hover:bg-white/10 py-8 px-12 text-xl"
              >
                加入群組
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            <Card className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition">
              <CardHeader className="p-6">
                <div className="flex justify-center">
                  <div className="mb-4 flex justify-center items-center rounded-2xl bg-purple-700/30 w-15 h-15">
                    <Zap size={32} />
                  </div>
                </div>
                <CardTitle className="text-white text-lg mb-2">
                  快速部署
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  我們有 Pterodactyl 讓你快速管理
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition">
              <CardHeader className="p-6">
                <div className="flex justify-center">
                  <div className="mb-4 flex justify-center items-center rounded-2xl bg-sky-700/30 w-15 h-15">
                    <Lock size={32} />
                  </div>
                </div>
                <CardTitle className="text-white text-lg mb-2">
                  安全隱私
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  我們不會偷啃你的 Token
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition">
              <CardHeader className="p-6">
                <div className="flex justify-center">
                  <div className="mb-4 flex justify-center items-center rounded-2xl bg-yellow-700/30 w-15 h-15">
                    <DollarSign size={32} />
                  </div>
                </div>
                <CardTitle className="text-white text-lg mb-2">
                  基本免費
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  但你可以幫我們加成伺服器
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
