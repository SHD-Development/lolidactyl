"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Server name must be at least 2 characters.",
  }),
  serverType: z.string({
    required_error: "Please select a server type.",
  }),
  nodeId: z.string({
    required_error: "Please select a node.",
  }),
  cpu: z.number().min(10).max(400),
  ram: z.number().min(128).max(16384),
  disk: z.number().min(128).max(32768),
  databases: z.number().min(0).max(10),
  backups: z.number().min(0).max(5),
  ports: z.number().min(0).max(10),
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

interface NodeAttributes {
  id: number;
  name: string;
}

interface Node {
  object: string;
  attributes: NodeAttributes;
}

interface ResourcePricing {
  base: number;
  cpu: number;
  ram: number;
  disk: number;
  databases: number;
  backups: number;
  ports: number;
}

const DEFAULT_PRICING: ResourcePricing = {
  base: 5,
  cpu: 1.5,
  ram: 0.01,
  disk: 0.05,
  databases: 2,
  backups: 3,
  ports: 0.5,
};

const safeToFixed = (
  value: number | undefined,
  decimals: number = 2
): string => {
  return (value ?? 0).toFixed(decimals);
};

export default function DashboardServersCreate() {
  const router = useRouter();
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
    ports: 0,
  });
  const [isLoadingPricing, setIsLoadingPricing] = useState(true);
  const [nests, setNests] = useState<Nest[]>([]);
  const [isLoadingEggs, setIsLoadingEggs] = useState(true);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isLoadingNodes, setIsLoadingNodes] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      serverType: "",
      nodeId: "",
      cpu: 100,
      ram: 1024,
      disk: 5,
      databases: 0,
      backups: 0,
      ports: 0,
    },
  });

  const watchedFields = form.watch([
    "cpu",
    "ram",
    "disk",
    "databases",
    "backups",
    "ports",
  ]);
  const [cpu, ram, disk, databases, backups, ports] = watchedFields;

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
            ports: fetchedPricing?.ports ?? DEFAULT_PRICING.ports,
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
    const fetchNodes = async () => {
      try {
        setIsLoadingNodes(true);
        const response = await axios.get("/api/nodes");

        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data)
        ) {
          setNodes(response.data.data);
        } else {
          console.error("Invalid nodes data format:", response.data);
          toast.error(t("messages.nodesError"));
        }
      } catch (error) {
        console.error("Error fetching nodes:", error);
        toast.error(t("messages.nodesError"));
      } finally {
        setIsLoadingNodes(false);
      }
    };

    fetchNodes();
  }, []);

  useEffect(() => {
    const calculatePrice = () => {
      const baseCost = pricing?.base ?? 0;
      const cpuCost = (cpu / 100) * (pricing?.cpu ?? 0);
      const ramCost = ram * (pricing?.ram ?? 0);
      const diskCost = disk * (pricing?.disk ?? 0);
      const databasesCost = databases * (pricing?.databases ?? 0);
      const backupsCost = backups * (pricing?.backups ?? 0);
      const portsCost = ports * (pricing?.ports ?? 0);

      const breakdown = {
        base: baseCost,
        cpu: cpuCost,
        ram: ramCost,
        disk: diskCost,
        databases: databasesCost,
        backups: backupsCost,
        ports: portsCost,
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
          portsCost
        ).toFixed(2)
      );
    };

    if (!isLoadingPricing) {
      const price = calculatePrice();
      setTotalPrice(price);
    }
  }, [cpu, ram, disk, databases, backups, ports, pricing, isLoadingPricing]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      totalPrice,
      priceBreakdown,
    });

    toast.success(
      `${values.name} ${t("messages.createSuccess")} ${safeToFixed(
        totalPrice
      )} ${t("pricing.droplets")}.`,
      {
        duration: 3000,
      }
    );

    setTimeout(() => {
      router.push("/dashboard/servers");
    }, 2000);
  }

  return (
    <div className="container mx-auto py-10 px-5">
      <Card className="max-w-3xl mx-auto border-2 border-border/50 shadow-md">
        <CardHeader className="bg-muted/30 py-5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
              <CardDescription className="text-sm mt-2">
                {t("description")}
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="text-lg py-2 px-4 bg-primary/10 text-center flex flex-col"
            >
              <span className="font-semibold text-green-500">
                - {t("available")} -
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Server Name - Single row */}
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

              {/* Node and Server Type - Same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nodeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        {t("form.node.label")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoadingNodes}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue
                              placeholder={
                                isLoadingNodes
                                  ? t("form.node.loadingPlaceholder")
                                  : t("form.node.placeholder")
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {nodes.map((node) => (
                            <SelectItem
                              key={node.attributes.id}
                              value={node.attributes.id.toString()}
                            >
                              {node.attributes.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        {t("form.node.description")}
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                                  value={egg.eggId.toString()}
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
                            min={10}
                            max={400}
                            step={5}
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
                              if (isNaN(value) || value < 10) {
                                field.onChange(10);
                              } else if (value > 400) {
                                field.onChange(400);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription className="text-xs mt-2">
                          {t("form.cpu.description")} $
                          {safeToFixed(priceBreakdown.cpu)}{" "}
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
                            min={128}
                            max={16384}
                            step={128}
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
                              if (isNaN(value) || value < 512) {
                                field.onChange(512);
                              } else if (value > 16384) {
                                field.onChange(16384);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription className="text-xs mt-2">
                          {t("form.ram.description")} $
                          {safeToFixed(priceBreakdown.ram)}{" "}
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
                            min={128}
                            max={32768}
                            step={128}
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
                              if (isNaN(value) || value < 5) {
                                field.onChange(5);
                              } else if (value > 500) {
                                field.onChange(500);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription className="text-xs mt-2">
                          {t("form.disk.description")} $
                          {safeToFixed(priceBreakdown.disk)}{" "}
                          {t("pricing.droplets")}
                        </FormDescription>
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
                              min={0}
                              max={10}
                              step={1}
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
                    name="ports"
                    render={({ field }) => (
                      <FormItem className="bg-card p-4 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-base font-medium">
                            {t("form.ports.label")}
                          </FormLabel>
                          <Badge variant="secondary">
                            ${safeToFixed(pricing.ports)}{" "}
                            {t("form.ports.pricePerUnit")}
                          </Badge>
                        </div>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <Slider
                              min={0}
                              max={5}
                              step={1}
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
                          {t("form.ports.description")} $
                          {safeToFixed(priceBreakdown.ports)}{" "}
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
                              min={0}
                              max={10}
                              step={1}
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
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="font-bold text-xl">
                          {t("pricing.title")}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          {t("pricing.description")}
                        </p>
                      </div>
                      <div className="text-2xl font-bold">
                        {isLoadingPricing
                          ? t("buttons.loading")
                          : `${safeToFixed(totalPrice)} ${t(
                              "pricing.droplets"
                            )}`}
                      </div>
                    </div>

                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{t("pricing.cost")}</span>
                        <span className="text-sm text-muted-foreground">
                          {t("pricing.resourceToCost")}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span>{t("pricing.baseCost")}</span>
                          <span className="text-green-600">
                            ${safeToFixed(priceBreakdown.base)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>CPU ({cpu}%):</span>
                          <span className="text-green-600">
                            ${safeToFixed(priceBreakdown.cpu)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>RAM ({ram} MiB):</span>
                          <span className="text-green-600">
                            ${safeToFixed(priceBreakdown.ram)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Disk ({disk} GB):</span>
                          <span className="text-green-600">
                            ${safeToFixed(priceBreakdown.disk)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Databases ({databases}):</span>
                          <span className="text-green-600">
                            ${safeToFixed(priceBreakdown.databases)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Backups ({backups}):</span>
                          <span className="text-green-600">
                            ${safeToFixed(priceBreakdown.backups)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Ports ({ports}):</span>
                          <span className="text-green-600">
                            ${safeToFixed(priceBreakdown.ports)}
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
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={
                      isLoadingPricing || isLoadingNodes || totalPrice <= 0
                    }
                  >
                    {isLoadingPricing || isLoadingNodes
                      ? t("buttons.loading")
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
  );
}
