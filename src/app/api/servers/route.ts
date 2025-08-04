import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/auth";
import appConfig from "@/config";

function validateResourceLimits(resources: {
  cpu: number;
  ram: number;
  disk: number;
  databases?: number;
  allocations?: number;
  backups?: number;
}) {
  const { cpu, ram, disk, databases, allocations, backups } = resources;

  if (cpu < appConfig.limit.cpu.min || cpu > appConfig.limit.cpu.max) {
    return `CPU must be between ${appConfig.limit.cpu.min} and ${appConfig.limit.cpu.max}`;
  }

  if (ram < appConfig.limit.ram.min || ram > appConfig.limit.ram.max) {
    return `RAM must be between ${appConfig.limit.ram.min} and ${appConfig.limit.ram.max} MiB`;
  }

  if (disk < appConfig.limit.disk.min || disk > appConfig.limit.disk.max) {
    return `Disk must be between ${appConfig.limit.disk.min} and ${appConfig.limit.disk.max} MiB`;
  }

  if (
    databases !== undefined &&
    (databases < appConfig.limit.databases.min ||
      databases > appConfig.limit.databases.max)
  ) {
    return `Databases must be between ${appConfig.limit.databases.min} and ${appConfig.limit.databases.max}`;
  }

  if (
    allocations !== undefined &&
    (allocations < appConfig.limit.allocations.min ||
      allocations > appConfig.limit.allocations.max)
  ) {
    return `Allocations must be between ${appConfig.limit.allocations.min} and ${appConfig.limit.allocations.max}`;
  }

  if (
    backups !== undefined &&
    (backups < appConfig.limit.backups.min ||
      backups > appConfig.limit.backups.max)
  ) {
    return `Backups must be between ${appConfig.limit.backups.min} and ${appConfig.limit.backups.max}`;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      locationId,
      serverType,
      nestId,
      cpu,
      ram,
      disk,
      databases,
      allocations,
      backups,
      autoRenew,
    } = body;

    if (
      !name ||
      !locationId ||
      !serverType ||
      !nestId ||
      !cpu ||
      !ram ||
      !disk
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const validationError = validateResourceLimits({
      cpu,
      ram,
      disk,
      databases,
      allocations,
      backups,
    });

    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    const serverData = {
      name,
      id: session.user.id,
      location: locationId,
      egg: serverType,
      nest: nestId,
      cpu,
      ram,
      disk,
      databases: databases || 0,
      allocations: allocations || 0,
      backups: backups || 0,
      autoRenew: autoRenew,
    };

    const apiKey = process.env.BACKEND_API_KEY;
    const apiUrl = new URL(process.env.BACKEND_API_URL as string);
    apiUrl.pathname = "/servers/create";

    const response = await axios.post(apiUrl.toString(), serverData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error creating server:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          error: error.response?.data || "Failed to create server",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create server" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const serverId = url.searchParams.get("id");
    const serverIds = url.searchParams.get("serverIds");

    let idsToDelete: string;
    if (serverIds) {
      idsToDelete = serverIds;
    } else if (serverId) {
      idsToDelete = serverId;
    } else {
      return NextResponse.json(
        { success: false, error: "Server ID(s) required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BACKEND_API_KEY;
    const apiUrl = new URL(process.env.BACKEND_API_URL as string);
    apiUrl.pathname = "/servers/delete";
    apiUrl.searchParams.append("serverIds", idsToDelete);
    apiUrl.searchParams.append("id", session.user.id);
    const response = await axios.delete(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error deleting server:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          error: error.response?.data || "Failed to delete server",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete server" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      serverId,
      locationId,
      serverType,
      nestId,
      cpu,
      ram,
      disk,
      databases,
      allocations,
      backups,
      autoRenew,
    } = body;

    if (!serverId) {
      return NextResponse.json(
        { success: false, error: "Server ID is required" },
        { status: 400 }
      );
    }

    if (!serverType || !nestId || !cpu || !ram || !disk) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const validationError = validateResourceLimits({
      cpu,
      ram,
      disk,
      databases,
      allocations,
      backups,
    });

    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    const serverData = {
      serverId,
      id: session.user.id,
      egg: serverType,
      nest: nestId,
      cpu,
      ram,
      disk,
      databases: databases || 0,
      allocations: allocations || 0,
      backups: backups || 0,
      autoRenew: autoRenew,
    };

    const apiKey = process.env.BACKEND_API_KEY;
    const apiUrl = new URL(process.env.BACKEND_API_URL as string);
    apiUrl.pathname = "/servers/modify";

    const response = await axios.patch(apiUrl.toString(), serverData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error modifying server:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          error: error.response?.data || "Failed to modify server",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to modify server" },
      { status: 500 }
    );
  }
}
