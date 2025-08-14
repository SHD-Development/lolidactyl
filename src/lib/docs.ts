import { Shield, Scale, FileText, BookOpen } from "lucide-react";

export interface DocumentMetadata {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
  lastUpdated: string;
  category: string;
  order: number;
  slug: string;
}

const iconMap = {
  Shield,
  Scale,
  FileText,
  BookOpen,
};

const colorMap = {
  blue: {
    background: "bg-blue-500/20 border-blue-500/30",
    text: "text-blue-600",
    badge: "bg-blue-50 text-blue-600 border-blue-200",
    border: "border-l-blue-500",
  },
  green: {
    background: "bg-green-500/20 border-green-500/30",
    text: "text-green-600",
    badge: "bg-green-50 text-green-600 border-green-200",
    border: "border-l-green-500",
  },
  red: {
    background: "bg-red-500/20 border-red-500/30",
    text: "text-red-600",
    badge: "bg-red-50 text-red-600 border-red-200",
    border: "border-l-red-500",
  },
  purple: {
    background: "bg-purple-500/20 border-purple-500/30",
    text: "text-purple-600",
    badge: "bg-purple-50 text-purple-600 border-purple-200",
    border: "border-l-purple-500",
  },
  yellow: {
    background: "bg-yellow-500/20 border-yellow-500/30",
    text: "text-yellow-600",
    badge: "bg-yellow-50 text-yellow-600 border-yellow-200",
    border: "border-l-yellow-500",
  },
};

export function getDocumentConfig(slug: string, metadata: DocumentMetadata) {
  const IconComponent =
    iconMap[metadata.icon as keyof typeof iconMap] || FileText;
  const colors =
    colorMap[metadata.color as keyof typeof colorMap] || colorMap.blue;

  return {
    ...metadata,
    icon: IconComponent,
    colors,
  };
}

export async function getDocsMetadata(): Promise<DocumentMetadata[]> {
  try {
    const response = await fetch("/api/docs");
    if (!response.ok) {
      throw new Error("Failed to fetch docs");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to load docs metadata:", error);
    return [];
  }
}
