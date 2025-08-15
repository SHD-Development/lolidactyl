"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Shield,
  Scale,
  Calendar,
  ArrowRight,
  BookOpen,
  Search,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getDocsMetadata, getDocumentConfig } from "@/lib/docs";
import type { DocumentMetadata } from "@/lib/docs";

export default function DocsIndexPage() {
  const t = useTranslations("docs.index");
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<
    DocumentMetadata[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const docs = await getDocsMetadata();
        setDocuments(docs);
        setFilteredDocuments(docs);
      } catch (error) {
        console.error("Failed to load documents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDocuments(documents);
      return;
    }

    const filtered = documents.filter((doc) => {
      const query = searchQuery.toLowerCase();
      return (
        (doc.title?.toLowerCase() || "").includes(query) ||
        (doc.titleEn?.toLowerCase() || "").includes(query) ||
        (doc.description?.toLowerCase() || "").includes(query) ||
        (doc.descriptionEn?.toLowerCase() || "").includes(query) ||
        (doc.category?.toLowerCase() || "").includes(query)
      );
    });

    setFilteredDocuments(filtered);
  }, [searchQuery, documents]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("loading")}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <div className="md:px-32 mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-12 w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => {
            const config = getDocumentConfig(doc.slug, doc);
            const IconComponent = config.icon;

            return (
              <Card
                key={doc.slug}
                className={`group hover:shadow-lg transition-all duration-300 border-l-4 ${config.colors.border}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${config.colors.background}`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${config.colors.text}`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {doc.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {t("lastUpdated")}: {doc.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className={config.colors.badge}>
                      {doc.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {doc.description}
                  </CardDescription>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn"
                  >
                    <Link href={`/docs/${doc.slug}`}>
                      {t("readMore")}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">{t("noResults")}</h3>
              <p className="text-sm">{t("noResultsHint")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
