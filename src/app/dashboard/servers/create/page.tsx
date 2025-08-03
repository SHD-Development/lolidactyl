"use client";

import { useState, useEffect } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import appConfig from "@/config";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Server name must be at least 2 characters.",
  }),
  serverType: z.number({
    required_error: "Please select a server type.",
  }),
  nestId: z.number({
    required_error: "Please select a server type.",
  }),
  locationId: z.number({
    required_error: "Please select a location.",
  }),
  cpu: z.number().min(appConfig.limit.cpu.min).max(appConfig.limit.cpu.max),
  ram: z.number().min(appConfig.limit.ram.min).max(appConfig.limit.ram.max),
  disk: z.number().min(appConfig.limit.disk.min).max(appConfig.limit.disk.max),
  databases: z
    .number()
    .min(appConfig.limit.databases.min)
    .max(appConfig.limit.databases.max),
  backups: z
    .number()
    .min(appConfig.limit.backups.min)
    .max(appConfig.limit.backups.max),
  allocations: z
    .number()
    .min(appConfig.limit.allocations.min)
    .max(appConfig.limit.allocations.max),
  autoRenew: z.boolean(),
});

interface Egg {
  eggId: number;
  eggName: string;
}

interface Nest {
  nestId: number;
  nestName: string;
  eggs: Egg[];
}

interface LocationAttributes {
  id: number;
  short: string;
  long: string | null;
  updated_at: string;
  created_at: string;
}

interface Location {
  object: string;
  attributes: LocationAttributes;
}

interface ResourcePricing {
  base: number;
  cpu: number;
  ram: number;
  disk: number;
  databases: number;
  backups: number;
  allocations: number;
}

interface UserInfo {
  coins: number;
  panelId: number;
}

const DEFAULT_PRICING: ResourcePricing = {
  base: 0,
  cpu: 0,
  ram: 0,
  disk: 0,
  databases: 0,
  backups: 0,
  allocations: 0,
};

const safeToFixed = (
  value: number | undefined,
  decimals: number = 2
): string => {
  return (value ?? 0).toFixed(decimals);
};

export default function DashboardServersCreate() {
  const router = useTransitionRouter();
  const t = useTranslations("serverCreate");
  const [pricing, setPricing] = useState<ResourcePricing>(DEFAULT_PRICING);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceBreakdown, setPriceBreakdown] = useState({
    base: 0,
    cpu: 0,
    ram: 0,
    disk: 0,
    databases: 0,
    backups: 0,
    allocations: 0,
  });
  const [isLoadingPricing, setIsLoadingPricing] = useState(true);
  const [nests, setNests] = useState<Nest[]>([]);
  const [isLoadingEggs, setIsLoadingEggs] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [isCreatingServer, setIsCreatingServer] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const [serviceStatus, setServiceStatus] = useState<boolean>(true);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      serverType: undefined,
      nestId: undefined,
      locationId: undefined,
      cpu: appConfig.limit.cpu.default,
      ram: appConfig.limit.ram.default,
      disk: appConfig.limit.disk.default,
      databases: appConfig.limit.databases.default,
      backups: appConfig.limit.backups.default,
      allocations: appConfig.limit.allocations.default,
      autoRenew: true,
    },
  });

  const watchedFields = form.watch([
    "cpu",
    "ram",
    "disk",
    "databases",
    "backups",
    "allocations",
  ]);
  const [cpu, ram, disk, databases, backups, allocations] = watchedFields;

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setIsLoadingPricing(true);
        const response = await axios.get("/api/pricing");

        if (response.data.success) {
          const fetchedPricing = response.data.data;
          const validatedPricing: ResourcePricing = {
            base: fetchedPricing?.base ?? DEFAULT_PRICING.base,
            cpu: fetchedPricing?.cpu ?? DEFAULT_PRICING.cpu,
            ram: fetchedPricing?.ram ?? DEFAULT_PRICING.ram,
            disk: fetchedPricing?.disk ?? DEFAULT_PRICING.disk,
            databases: fetchedPricing?.databases ?? DEFAULT_PRICING.databases,
            backups: fetchedPricing?.backups ?? DEFAULT_PRICING.backups,
            allocations:
              fetchedPricing?.allocations ?? DEFAULT_PRICING.allocations,
          };
          setPricing(validatedPricing);
        } else {
          console.error("Failed to fetch pricing:", response.data.error);
          setPricing(DEFAULT_PRICING);
          toast.error(t("messages.pricingError"));
        }
      } catch (error) {
        console.error("Error fetching pricing:", error);
        setPricing(DEFAULT_PRICING);
        toast.error(t("messages.pricingError"));
      } finally {
        setIsLoadingPricing(false);
      }
    };

    fetchPricing();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoadingUserInfo(true);
        const response = await axios.get("/api/userinfo");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        toast.error(t("toasts.userInfoError"));
      } finally {
        setIsLoadingUserInfo(false);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchServiceStatus = async () => {
      try {
        setIsLoadingStatus(true);
        const response = await axios.get("/api/status");
        setServiceStatus(response.data.status);
      } catch (error) {
        console.error("Failed to fetch service status:", error);
        setServiceStatus(false);
      } finally {
        setIsLoadingStatus(false);
      }
    };

    fetchServiceStatus();
  }, []);

  useEffect(() => {
    const fetchEggs = async () => {
      try {
        setIsLoadingEggs(true);
        const response = await axios.get("/api/eggs");

        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data)
        ) {
          setNests(response.data.data);
        } else {
          console.error("Invalid eggs data format:", response.data);
          toast.error(t("messages.serverTypesError"));
        }
      } catch (error) {
        console.error("Error fetching eggs:", error);
        toast.error(t("messages.serverTypesError"));
      } finally {
        setIsLoadingEggs(false);
      }
    };

    fetchEggs();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoadingLocations(true);
        const response = await axios.get("/api/locations");

        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data)
        ) {
          setLocations(response.data.data);
        } else {
          console.error("Invalid locations data format:", response.data);
          toast.error(t("messages.locationsError"));
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error(t("messages.locationsError"));
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const calculatePrice = () => {
      const baseCost = pricing?.base ?? 0;
      const cpuCost = cpu * (pricing?.cpu ?? 0);
      const ramCost = ram * (pricing?.ram ?? 0);
      const diskCost = disk * (pricing?.disk ?? 0);
      const databasesCost = databases * (pricing?.databases ?? 0);
      const backupsCost = backups * (pricing?.backups ?? 0);
      const allocationsCost = allocations * (pricing?.allocations ?? 0);

      const breakdown = {
        base: baseCost,
        cpu: cpuCost,
        ram: ramCost,
        disk: diskCost,
        databases: databasesCost,
        backups: backupsCost,
        allocations: allocationsCost,
      };

      setPriceBreakdown(breakdown);

      return parseFloat(
        (
          baseCost +
          cpuCost +
          ramCost +
          diskCost +
          databasesCost +
          backupsCost +
          allocationsCost
        ).toFixed(2)
      );
    };

    if (!isLoadingPricing) {
      const price = calculatePrice();
      setTotalPrice(price);
    }
  }, [
    cpu,
    ram,
    disk,
    databases,
    backups,
    allocations,
    pricing,
    isLoadingPricing,
  ]);

  const hasEnoughDroplets = () => {
    if (!userInfo || isNaN(totalPrice)) return false;
    return userInfo.coins >= totalPrice;
  };

  const getRemainingDroplets = () => {
    if (!userInfo || isNaN(totalPrice)) return 0;
    return userInfo.coins - totalPrice;
  };

  const getExpirationDate = () => {
    const now = new Date();
    const expirationDate = new Date(now);
    expirationDate.setMonth(now.getMonth() + 1);

    const timeDiff = expirationDate.getTime() - now.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const year = expirationDate.getFullYear();
    const month = expirationDate.getMonth() + 1;
    const day = expirationDate.getDate();

    return {
      formatted: `${year}/${month}/${day}`,
      daysRemaining,
    };
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      totalPrice,
      priceBreakdown,
    });

    const createServer = async () => {
      let loadingToast;
      try {
        setIsCreatingServer(true);

        loadingToast = toast.loading(
          t("toasts.creatingServer") + ` ${values.name}...`,
          {
            duration: Infinity,
          }
        );

        const response = await axios.post("/api/servers", {
          name: values.name,
          locationId: values.locationId,
          serverType: values.serverType,
          nestId: values.nestId,
          cpu: values.cpu,
          ram: values.ram,
          disk: values.disk,
          databases: values.databases,
          allocations: values.allocations,
          backups: values.backups,
          autoRenew: values.autoRenew,
        });

        toast.dismiss(loadingToast);

        if (response.data.success) {
          toast.success(
            `${values.name} ${t("messages.createSuccess")} ${safeToFixed(
              totalPrice
            )} ${t("pricing.droplets")}.`,
            {
              duration: 4000,
            }
          );

          setTimeout(() => {
            router.push("/dashboard/servers/manage");
          }, 1500);
        } else {
          toast.error(response.data.error || t("messages.createError"));
        }
      } catch (error) {
        console.error("Error creating server:", error);
        if (loadingToast) {
          toast.dismiss(loadingToast);
        }

        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 400 &&
            error.response?.data?.error.errors[0].code ==
              "NoViableNodeException"
          ) {
            toast.error(t("messages.nodeFullError"));
          } else {
            toast.error(
              error.response?.data?.error || t("messages.createError")
            );
          }
        } else {
          toast.error(t("messages.createError"));
        }
      } finally {
        setIsCreatingServer(false);
      }
    };

    createServer();
  }

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
                  {useTranslations("common")("dashboard")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  {useTranslations("servers.breadcrumbs")("servers")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {useTranslations("servers.breadcrumbs")("create")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="container mx-auto py-10 px-5">
        <Card className="max-w-3xl mx-auto border-2 border-border/50 shadow-md">
          <CardHeader className="bg-muted/30 py-5">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {t("title")}
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  {t("description")}
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="text-lg py-2 px-4 bg-primary/10 text-center flex flex-col"
              >
                {isLoadingStatus ? (
                  <span className="font-semibold text-gray-500">
                    - {t("status.checking")} -
                  </span>
                ) : serviceStatus ? (
                  <span className="font-semibold text-green-500">
                    - {t("status.available")} -
                  </span>
                ) : (
                  <span className="font-semibold text-red-500">
                    - {t("status.suspended")} -
                  </span>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          {t("form.serverName.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("form.serverName.placeholder")}
                            className="h-10"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          {t("form.serverName.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="locationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          {t("form.location.label")}
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString()}
                          disabled={isLoadingLocations}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue
                                placeholder={
                                  isLoadingLocations
                                    ? t("form.location.loadingPlaceholder")
                                    : t("form.location.placeholder")
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem
                                key={location.attributes.id}
                                value={location.attributes.id.toString()}
                              >
                                {location.attributes.short}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">
                          {t("form.location.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serverType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          {t("form.serverType.label")}
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const [nestId, eggId] = value
                              .split(":")
                              .map(Number);
                            field.onChange(eggId);
                            form.setValue("nestId", nestId);
                          }}
                          value={
                            field.value && form.getValues("nestId")
                              ? `${form.getValues("nestId")}:${field.value}`
                              : undefined
                          }
                          disabled={isLoadingEggs}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue
                                placeholder={
                                  isLoadingEggs
                                    ? t("form.serverType.loadingPlaceholder")
                                    : t("form.serverType.placeholder")
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {nests.map((nest) => (
                              <SelectGroup key={nest.nestId}>
                                <SelectLabel>{nest.nestName}</SelectLabel>
                                {nest.eggs.map((egg) => (
                                  <SelectItem
                                    key={egg.eggId}
                                    value={`${nest.nestId}:${egg.eggId}`}
                                  >
                                    {egg.eggName}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">
                          {t("form.serverType.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Tabs defaultValue="resources" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="resources" className="text-sm">
                      {t("tabs.resources")}
                    </TabsTrigger>
                    <TabsTrigger value="databases" className="text-sm">
                      {t("tabs.advanced")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="resources" className="space-y-6">
                    <FormField
                      control={form.control}
                      name="cpu"
                      render={({ field }) => (
                        <FormItem className="bg-card p-4 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-base font-medium">
                              {t("form.cpu.label")}
                            </FormLabel>
                            <Badge variant="secondary">
                              ${safeToFixed(pricing.cpu)}{" "}
                              {t("form.cpu.pricePerUnit")}
                            </Badge>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              min={appConfig.limit.cpu.min}
                              max={appConfig.limit.cpu.max}
                              step={appConfig.limit.cpu.step}
                              className="w-full h-10"
                              placeholder={t("form.cpu.placeholder")}
                              value={field.value}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue === "") {
                                  return;
                                }
                                const value = Number(inputValue);
                                if (!isNaN(value)) {
                                  field.onChange(value);
                                }
                              }}
                              onBlur={() => {
                                const currentValue = field.value;
                                const value = Number(currentValue);
                                if (
                                  isNaN(value) ||
                                  value < appConfig.limit.cpu.min
                                ) {
                                  field.onChange(appConfig.limit.cpu.min);
                                } else if (value > appConfig.limit.cpu.max) {
                                  field.onChange(appConfig.limit.cpu.max);
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription className="text-xs mt-2">
                            {t("form.cpu.description")} $
                            {isNaN(priceBreakdown.cpu)
                              ? "0.00"
                              : safeToFixed(priceBreakdown.cpu)}{" "}
                            {t("pricing.droplets")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ram"
                      render={({ field }) => (
                        <FormItem className="bg-card p-4 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-base font-medium">
                              {t("form.ram.label")}
                            </FormLabel>
                            <Badge variant="secondary">
                              ${safeToFixed(pricing.ram)}{" "}
                              {t("form.ram.pricePerUnit")}
                            </Badge>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              min={appConfig.limit.ram.min}
                              max={appConfig.limit.ram.max}
                              step={appConfig.limit.ram.step}
                              className="w-full h-10"
                              placeholder={t("form.ram.placeholder")}
                              value={field.value}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue === "") {
                                  return;
                                }
                                const value = Number(inputValue);
                                if (!isNaN(value)) {
                                  field.onChange(value);
                                }
                              }}
                              onBlur={() => {
                                const currentValue = field.value;
                                const value = Number(currentValue);
                                if (
                                  isNaN(value) ||
                                  value < appConfig.limit.ram.min
                                ) {
                                  field.onChange(appConfig.limit.ram.min);
                                } else if (value > appConfig.limit.ram.max) {
                                  field.onChange(appConfig.limit.ram.max);
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription className="text-xs mt-2">
                            {t("form.ram.description")} $
                            {isNaN(priceBreakdown.ram)
                              ? "0.00"
                              : safeToFixed(priceBreakdown.ram)}{" "}
                            {t("pricing.droplets")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="disk"
                      render={({ field }) => (
                        <FormItem className="bg-card p-4 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-base font-medium">
                              {t("form.disk.label")}
                            </FormLabel>
                            <Badge variant="secondary">
                              ${safeToFixed(pricing.disk)}{" "}
                              {t("form.disk.pricePerUnit")}
                            </Badge>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              min={appConfig.limit.disk.min}
                              max={appConfig.limit.disk.max}
                              step={appConfig.limit.disk.step}
                              className="w-full h-10"
                              placeholder={t("form.disk.placeholder")}
                              value={field.value}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue === "") {
                                  return;
                                }
                                const value = Number(inputValue);
                                if (!isNaN(value)) {
                                  field.onChange(value);
                                }
                              }}
                              onBlur={() => {
                                const currentValue = field.value;
                                const value = Number(currentValue);
                                if (
                                  isNaN(value) ||
                                  value < appConfig.limit.disk.min
                                ) {
                                  field.onChange(appConfig.limit.disk.min);
                                } else if (value > appConfig.limit.disk.max) {
                                  field.onChange(appConfig.limit.disk.max);
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription className="text-xs mt-2">
                            {t("form.disk.description")} $
                            {isNaN(priceBreakdown.disk)
                              ? "0.00"
                              : safeToFixed(priceBreakdown.disk)}{" "}
                            {t("pricing.droplets")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="autoRenew"
                      render={({ field }) => (
                        <FormItem className="bg-card p-4 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">
                                {t("form.autoRenew.label")}
                              </FormLabel>
                              <FormDescription className="text-xs">
                                {t("form.autoRenew.description")}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="databases" className="space-y-6">
                    <FormField
                      control={form.control}
                      name="databases"
                      render={({ field }) => (
                        <FormItem className="bg-card p-4 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-base font-medium">
                              {t("form.databases.label")}
                            </FormLabel>
                            <Badge variant="secondary">
                              ${safeToFixed(pricing.databases)}{" "}
                              {t("form.databases.pricePerUnit")}
                            </Badge>
                          </div>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Slider
                                min={appConfig.limit.databases.min}
                                max={appConfig.limit.databases.max}
                                step={appConfig.limit.databases.step}
                                defaultValue={[field.value]}
                                onValueChange={(values) =>
                                  field.onChange(values[0])
                                }
                                className="flex-1"
                              />
                              <span className="w-16 text-right font-medium">
                                {field.value}
                              </span>
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs mt-2">
                            {t("form.databases.description")} $
                            {safeToFixed(priceBreakdown.databases)}{" "}
                            {t("pricing.droplets")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="allocations"
                      render={({ field }) => (
                        <FormItem className="bg-card p-4 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-base font-medium">
                              {t("form.allocations.label")}
                            </FormLabel>
                            <Badge variant="secondary">
                              ${safeToFixed(pricing.allocations)}{" "}
                              {t("form.allocations.pricePerUnit")}
                            </Badge>
                          </div>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Slider
                                min={appConfig.limit.allocations.min}
                                max={appConfig.limit.allocations.max}
                                step={appConfig.limit.allocations.step}
                                defaultValue={[field.value]}
                                onValueChange={(values) =>
                                  field.onChange(values[0])
                                }
                                className="flex-1"
                              />
                              <span className="w-16 text-right font-medium">
                                {field.value}
                              </span>
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs mt-2">
                            {t("form.allocations.description")} $
                            {safeToFixed(priceBreakdown.allocations)}{" "}
                            {t("pricing.droplets")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="backups"
                      render={({ field }) => (
                        <FormItem className="bg-card p-4 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-base font-medium">
                              {t("form.backups.label")}
                            </FormLabel>
                            <Badge variant="secondary">
                              ${safeToFixed(pricing.backups)}{" "}
                              {t("form.backups.pricePerUnit")}
                            </Badge>
                          </div>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Slider
                                min={appConfig.limit.backups.min}
                                max={appConfig.limit.backups.max}
                                step={appConfig.limit.backups.step}
                                defaultValue={[field.value]}
                                onValueChange={(values) =>
                                  field.onChange(values[0])
                                }
                                className="flex-1"
                              />
                              <span className="w-16 text-right font-medium">
                                {field.value}
                              </span>
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs mt-2">
                            {t("form.backups.description")} $
                            {safeToFixed(priceBreakdown.backups)}{" "}
                            {t("pricing.droplets")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>

                <div className="pt-4 w-full">
                  <div className="flex flex-col gap-10">
                    <div className="bg-muted/30 p-4 rounded-lg relative">
                      {isNaN(totalPrice) && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                          <div className="text-center p-6">
                            <h3 className="text-lg font-semibold mb-2">
                              {t("messages.NaNError")}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {t("messages.NaNErrorDescription")}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="font-bold text-xl">
                            {t("pricing.title")}
                          </h1>
                          <p className="text-sm text-muted-foreground">
                            {t("pricing.description")}
                          </p>
                        </div>
                        <div
                          className={`text-2xl font-bold ${
                            hasEnoughDroplets()
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {isLoadingPricing
                            ? t("buttons.loading")
                            : `${safeToFixed(totalPrice)} ${t(
                                "pricing.droplets"
                              )}`}
                        </div>
                      </div>

                      <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">
                            {t("pricing.cost")}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {t("pricing.resourceToCost")}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span>{t("pricing.baseCost")}</span>
                            <span className="text-yellow-600">
                              ${safeToFixed(priceBreakdown.base)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>
                              {t("pricing.cpu")} ({cpu}%):
                            </span>
                            <span className="text-yellow-600">
                              ${safeToFixed(priceBreakdown.cpu)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>
                              {t("pricing.ram")} ({ram} MiB):
                            </span>
                            <span className="text-yellow-600">
                              ${safeToFixed(priceBreakdown.ram)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>
                              {t("pricing.disk")} ({disk} MiB):
                            </span>
                            <span className="text-yellow-600">
                              ${safeToFixed(priceBreakdown.disk)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>
                              {t("pricing.databases")} ({databases}):
                            </span>
                            <span className="text-yellow-600">
                              ${safeToFixed(priceBreakdown.databases)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>
                              {t("pricing.backups")} ({backups}):
                            </span>
                            <span className="text-yellow-600">
                              ${safeToFixed(priceBreakdown.backups)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>
                              {t("pricing.allocations")} ({allocations}):
                            </span>
                            <span className="text-yellow-600">
                              ${safeToFixed(priceBreakdown.allocations)}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <span className="font-semibold text-lg">
                            {t("pricing.totalCost")}
                          </span>
                          <span className="font-bold text-lg text-primary">
                            ${safeToFixed(totalPrice)} {t("pricing.droplets")}
                          </span>
                        </div>

                        <div className="border-t mt-4 pt-4 space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              {t("balance.change")}
                            </span>
                            <span className="font-medium">
                              {isLoadingUserInfo
                                ? t("buttons.loading")
                                : !isNaN(totalPrice) && userInfo
                                ? `${safeToFixed(
                                    userInfo.coins
                                  )} → ${safeToFixed(
                                    getRemainingDroplets()
                                  )} ${t("pricing.droplets")}`
                                : `${safeToFixed(userInfo?.coins ?? 0)} ${t(
                                    "pricing.droplets"
                                  )}`}
                            </span>
                          </div>

                          {!isLoadingUserInfo &&
                            userInfo &&
                            !isNaN(totalPrice) && (
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">
                                  {t("balance.status")}
                                </span>
                                <span
                                  className={`font-medium ${
                                    hasEnoughDroplets()
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {hasEnoughDroplets()
                                    ? t("balance.sufficient")
                                    : t("balance.insufficient")}
                                </span>
                              </div>
                            )}

                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              {t("balance.expiration")}
                            </span>
                            <span className="font-medium text-blue-600">
                              {getExpirationDate().formatted} (
                              {t("balance.daysRemain")}
                              {getExpirationDate().daysRemaining}
                              {t("balance.daysRemaining")})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium"
                      disabled={
                        isLoadingPricing ||
                        isLoadingLocations ||
                        isLoadingUserInfo ||
                        isLoadingStatus ||
                        isCreatingServer ||
                        totalPrice <= 0 ||
                        isNaN(totalPrice) ||
                        !hasEnoughDroplets() ||
                        !serviceStatus
                      }
                    >
                      {isLoadingPricing ||
                      isLoadingLocations ||
                      isLoadingUserInfo ||
                      isLoadingStatus
                        ? t("buttons.loading")
                        : isCreatingServer
                        ? t("buttons.creating")
                        : !serviceStatus
                        ? t("buttons.serviceSuspended")
                        : isNaN(totalPrice)
                        ? t("buttons.pleaseComplete")
                        : !hasEnoughDroplets()
                        ? t("buttons.insufficientBalance")
                        : `${t("buttons.create")} - ${safeToFixed(
                            totalPrice
                          )} ${t("pricing.droplets")}`}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
