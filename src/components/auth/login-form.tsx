import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/auth";
import { FaDiscord } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";
import { Link } from "next-view-transitions";
import Image from "next/image";
export async function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  async function discordLogin() {
    "use server";
    await signIn("discord", { redirectTo: "/dashboard" });
  }
  const t = await getTranslations("loginForm");
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t("welcomeBack")}</h1>
                <p className="text-muted-foreground text-balance">
                  {t("description")}
                </p>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  {t("continueWith")}
                </span>
              </div>

              <div className="grid grid-rows-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={discordLogin}
                >
                  <FaDiscord className="h-4 w-4" />
                  <span>Discord</span>
                </Button>
                <Button variant="outline" disabled>
                  {t("comingSoon")}
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/images/amamiya.webp"
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {t("agreement")}
      </div>
    </div>
  );
}
