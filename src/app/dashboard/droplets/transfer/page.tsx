"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ArrowRightLeft, Droplets, Send } from "lucide-react";
import { Cover } from "@/components/ui/cover";
interface TransferResponse {
  status: "success" | "error";
  from?: number;
  to?: number;
  fee?: number;
  actualTransfer?: number;
  errors?: string[];
}

export default function TransferPage() {
  const t = useTranslations("transfer");
  const tCommon = useTranslations("common");
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState<{
    open: boolean;
    from: number;
    to: number;
    fee: number;
    actualTransfer: number;
  }>({
    open: false,
    from: 0,
    to: 0,
    fee: 0,
    actualTransfer: 0,
  });

  const handleTransfer = async () => {
    if (!recipientId.trim()) {
      toast.error(t("errors.invalidRecipient"));
      return;
    }

    const transferAmount = parseFloat(amount);
    if (!transferAmount || transferAmount <= 0) {
      toast.error(t("errors.invalidAmount"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/transfer", {
        to: recipientId.trim(),
        coins: transferAmount,
      });

      const data: TransferResponse = response.data;

      if (data.status === "success") {
        setSuccessDialog({
          open: true,
          from: data.from!,
          to: data.to!,
          fee: data.fee!,
          actualTransfer: data.actualTransfer!,
        });
        setRecipientId("");
        setAmount("");
      } else if (data.status === "error" && data.errors) {
        const errorMessage = data.errors[0];
        if (errorMessage === "Receiver not found") {
          toast.error(t("errors.receiverNotFound"));
        } else if (errorMessage === "Insufficient balance") {
          toast.error(t("errors.insufficientBalance"));
        } else if (errorMessage === "Transfer amount too low") {
          toast.error(t("errors.amountTooLow"));
        } else if (errorMessage === "Same user transfer is not allowed") {
          toast.error(t("errors.sameUserTransfer"));
        } else {
          toast.error(t("errors.transferFailed"));
        }
      } else {
        toast.error(t("errors.transferFailed"));
      }
    } catch (error) {
      console.error("Transfer error:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const data: TransferResponse = error.response.data;
        if (data.status === "error" && data.errors) {
          const errorMessage = data.errors[0];
          if (errorMessage === "Receiver not found") {
            toast.error(t("errors.receiverNotFound"));
          } else if (errorMessage === "Insufficient balance") {
            toast.error(t("errors.insufficientBalance"));
          } else if (errorMessage === "Transfer amount too low") {
            toast.error(t("errors.amountTooLow"));
          } else if (errorMessage === "Same user transfer is not allowed") {
            toast.error(t("errors.sameUserTransfer"));
          } else {
            toast.error(t("errors.transferFailed"));
          }
        } else {
          toast.error(t("errors.transferFailed"));
        }
      } else {
        toast.error(t("errors.transferFailed"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  {tCommon("dashboard")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  {tCommon("droplets")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("breadcrumbs")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="mx-auto w-full max-w-4xl">
          <Card className="border border-border shadow-2xl bg-card">
            <CardHeader className="text-center pb-8 pt-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-lg border border-primary/20">
                <ArrowRightLeft className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">{t("title")}</CardTitle>
              <CardDescription className="text-lg mt-4 max-w-2xl mx-auto">
                {t("description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-12 pb-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-base font-medium">
                    {t("form.recipientLabel")}
                  </Label>
                  <Input
                    id="recipient"
                    type="text"
                    placeholder={t("form.recipientPlaceholder")}
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="h-12 text-base"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-base font-medium">
                    {t("form.amountLabel")}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={t("form.amountPlaceholder")}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 text-base"
                    disabled={isLoading}
                    min="0"
                    step="0.01"
                  />
                </div>
                <Cover className="w-full block">
                  <Button
                    onClick={handleTransfer}
                    disabled={isLoading || !recipientId.trim() || !amount}
                    className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isLoading ? t("form.processing") : t("form.submit")}
                  </Button>
                </Cover>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={successDialog.open}
        onOpenChange={(open) => setSuccessDialog((prev) => ({ ...prev, open }))}
      >
        <DialogContent className="sm:max-w-lg border shadow-2xl bg-card">
          <DialogHeader>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40 shadow-xl border border-green-200 dark:border-green-800">
              <ArrowRightLeft className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-green-600 dark:text-green-400">
              {t("success.title")}
            </DialogTitle>
            <DialogDescription className="text-center text-base mt-2">
              {t("success.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="rounded-xl bg-green-50 dark:bg-green-900/20 p-6 text-center border border-green-200 dark:border-green-800 shadow-inner">
              <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                {t("success.actualTransfer")}
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                <Droplets className="h-7 w-7" />
                {successDialog.actualTransfer.toFixed(2)}{" "}
                {t("success.droplets")}
              </div>
            </div>

            <div className="space-y-3 rounded-xl border-2 border-dashed border-muted-foreground/20 p-6 bg-muted/30">
              <div className="text-center mb-4">
                <div className="text-sm font-medium text-muted-foreground">
                  {t("success.details")}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {t("success.yourBalance")}:
                </span>
                <span className="text-sm font-mono flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  {successDialog.from.toFixed(2)} {t("success.droplets")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {t("success.recipientBalance")}:
                </span>
                <span className="text-sm font-mono flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  {successDialog.to.toFixed(2)} {t("success.droplets")}
                </span>
              </div>

              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-sm font-medium">{t("success.fee")}:</span>
                <span className="text-sm font-mono flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  {successDialog.fee.toFixed(2)} {t("success.droplets")}
                </span>
              </div>
            </div>

            <Button
              onClick={() =>
                setSuccessDialog((prev) => ({ ...prev, open: false }))
              }
              size="lg"
              className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2">
                {t("success.close")}
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
