import { z } from "zod";

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;

export const CreateCloneSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    description: z.string().min(1, "Description is required").max(500),
    sourceType: z.enum(["MIXED", "YOUTUBE", "DOCUMENTS", "TEXT"]),
    youtubeURLs: z.array(z.string().regex(youtubeRegex, "Invalid YouTube URL")),
    customText: z.string().optional(),
    documents: z.array(z.string()).optional(),
    voiceId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.sourceType === "YOUTUBE" &&
      (!data.youtubeURLs || data.youtubeURLs.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one YouTube URL is required for YouTube source type",
        path: ["youtubeURLs"],
      });
    }

    if (data.sourceType === "TEXT" && !data.customText) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Custom text is required for Text source type",
        path: ["customText"],
      });
    }

    if (
      data.sourceType === "DOCUMENTS" &&
      (!data.documents || data.documents.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one document is required for Documents source type",
        path: ["documents"],
      });
    }

    if (
      data.sourceType === "MIXED" &&
      !data.youtubeURLs?.length &&
      !data.customText &&
      !data.documents?.length
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Mixed source requires at least one content source (YouTube URLs, Custom Text, or Documents)",
        path: ["sourceType"],
      });
    }
  });

export type CreateCloneInput = z.infer<typeof CreateCloneSchema>;
