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
import { ResourceCard } from "@/components/resource-cards";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function Dashboard() {
  const t = useTranslations("dashboard");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("breadcrumbs")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-6 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <ResourceCard type="CPU" usage={75} maxUsage={100} unit="%" />
          <ResourceCard type="RAM" usage={1024} maxUsage={2048} unit="MiB" />
          <ResourceCard type="Disk" usage={5120} maxUsage={10240} unit="MiB" />

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-50 w-full border-dashed border-2 flex flex-col gap-2 hover:bg-zinc-800/20 transition-colors"
              >
                <PlusCircle className="h-6 w-6" />
                <span>Show More Resources</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2/5 max-h-3/5 overflow-y-auto">
              <DialogHeader className="text-center">
                <DialogTitle>Additional Resources</DialogTitle>
              </DialogHeader>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 place-items-center px-4 py-6 h-full ">
                <ResourceCard type="Ports" usage={3} maxUsage={5} unit="個" />
                <ResourceCard
                  type="Databases"
                  usage={2}
                  maxUsage={3}
                  unit="個"
                />
                <ResourceCard
                  type="Backups"
                  usage={5}
                  maxUsage={10}
                  unit="個"
                />
                <ResourceCard type="Servers" usage={1} maxUsage={2} unit="個" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
