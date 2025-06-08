import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive, Database, Network, Server, Save } from "lucide-react";

interface ResourceCardProps {
  type: "CPU" | "RAM" | "Disk" | "Ports" | "Databases" | "Backups" | "Servers";
  usage: number;
  maxUsage: number;
  unit?: string;
}

export function ResourceCard({
  type,
  usage,
  maxUsage,
  unit = "%",
}: ResourceCardProps) {
  const getIcon = () => {
    switch (type) {
      case "CPU":
        return <Cpu className="h-5 w-5 text-blue-500" />;
      case "RAM":
        return <HardDrive className="h-5 w-5 text-emerald-500" />;
      case "Disk":
        return <HardDrive className="h-5 w-5 text-purple-500" />;
      case "Ports":
        return <Network className="h-5 w-5 text-amber-500" />;
      case "Databases":
        return <Database className="h-5 w-5 text-sky-500" />;
      case "Backups":
        return <Save className="h-5 w-5 text-rose-500" />;
      case "Servers":
        return <Server className="h-5 w-5 text-indigo-500" />;
      default:
        return <Cpu className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "CPU":
        return "bg-blue-500/10";
      case "RAM":
        return "bg-emerald-500/10";
      case "Disk":
        return "bg-purple-500/10";
      case "Ports":
        return "bg-amber-500/10";
      case "Databases":
        return "bg-sky-500/10";
      case "Backups":
        return "bg-rose-500/10";
      case "Servers":
        return "bg-indigo-500/10";
      default:
        return "bg-blue-500/10";
    }
  };

  const getGradient = () => {
    switch (type) {
      case "CPU":
        return "from-blue-600 to-blue-400";
      case "RAM":
        return "from-emerald-600 to-emerald-400";
      case "Disk":
        return "from-purple-600 to-purple-400";
      case "Ports":
        return "from-amber-600 to-amber-400";
      case "Databases":
        return "from-sky-600 to-sky-400";
      case "Backups":
        return "from-rose-600 to-rose-400";
      case "Servers":
        return "from-indigo-600 to-indigo-400";
      default:
        return "from-blue-600 to-blue-400";
    }
  };

  const percentage = (usage / maxUsage) * 100;
  const isOverLimit = usage >= maxUsage;

  return (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${getBgColor()}`}>{getIcon()}</div>
          <CardTitle className="text-xl font-semibold">{type}</CardTitle>
        </div>
        <div className="bg-zinc-800 px-2 py-1 rounded-md">
          <span
            className={`text-xs font-medium ${
              isOverLimit ? "text-red-400" : "text-green-400"
            }`}
          >
            {isOverLimit ? "Maxed out" : "Available"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-5 mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-zinc-400">Usage</span>
            <div className="flex items-center gap-1">
              <span
                className={`text-lg font-bold ${
                  isOverLimit ? "text-red-400" : "text-white"
                }`}
              >
                {usage}
              </span>
              <span className="text-xs text-zinc-400">
                / {maxUsage} {unit}
              </span>
            </div>
          </div>
          <div className="w-full bg-zinc-800/50 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-in-out animate-pulse bg-gradient-to-r ${getGradient()}`}
              style={{
                width: `${Math.min(100, percentage)}%`,
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
