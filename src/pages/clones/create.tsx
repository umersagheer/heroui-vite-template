import {
  addToast,
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagicWand, Plus, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { useNavigate } from "react-router-dom";
import { cloneService } from "@/services/clone.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useCreateClone } from "@/libs/api/clone.query";
import { CreateCloneInput, CreateCloneSchema } from "@/libs/schemas/clone";

export default function CreateClonePage() {
  const [newYouTubeURL, setNewYouTubeURL] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthStore((state) => state);
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
    handleSubmit,
  } = useForm<CreateCloneInput>({
    resolver: zodResolver(CreateCloneSchema),
    mode: "onSubmit",
    defaultValues: {
      customText: "",
      description: "",
      documents: [],
      name: "",
      sourceType: "YOUTUBE",
      voiceId: "",
      youtubeURLs: [],
    },
  });

  const sourceType = watch("sourceType");
  const name = watch("name");
  const youtubeURLs = watch("youtubeURLs");

  const { mutateAsync: createClone, isPending } = useCreateClone();

  const onSubmit = (values: CreateCloneInput) => {
    console.log(values);

    createClone(values, {
      onSuccess: async (data) => {
        addToast({
          title: "Clone created",
          color: "success",
          description:
            "Your clone was created successfully. Starting processing...",
        });

        try {
          // Start processing
          await cloneService.processClone(data.id);

          addToast({
            title: "Processing complete",
            description: "Your clone is now ready to use.",
            color: "success",
          });

          navigate(`/u/${user?.id}/clones`);
        } catch (e: any) {
          addToast({
            title: "❌ Processing failed",
            description: e.message || "Something went wrong during processing.",
            color: "danger",
          });
        }
      },

      onError: (error) => {
        addToast({
          title: "Error creating clone",
          description: error.message,
          color: "danger",
        });
      },
    });
  };

  useEffect(() => {
    if (errors.sourceType?.message) {
      addToast({
        title: "Error",
        color: "warning",
        description: errors.sourceType.message,
      });
    }
  }, [errors.sourceType]);

  const addYouTubeURL = (url: string) => {
    // Allow add not more then 3 URLs
    if (youtubeURLs.length >= 3) {
      addToast({
        title: "Error",
        color: "warning",
        description: "You can only add up to 3 YouTube URLs.",
      });
      return;
    } else if (url.trim() !== "") {
      const currentURLs = getValues("youtubeURLs");
      setValue("youtubeURLs", [...currentURLs, url]);
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full w-full items-center justify-center">
      <div className="flex items-center w-full gap-3 justify-start">
        <h2 className="text-2xl font-bold self-start">Create Clone</h2>
        <Avatar
          size={30}
          name={name}
          variant="marble"
          colors={["#7828c8", "#006FEE", "#f31260", "#f5a524"]}
        />
      </div>
      <Card className=" w-full">
        <CardBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 "
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Clone Name"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.name)}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Description"
                  size="sm"
                  {...field}
                  className="lg:col-span-2"
                  isInvalid={Boolean(errors.description)}
                  errorMessage={errors.description?.message}
                />
              )}
            />

            {/* Select SourceType */}
            <Controller
              name="sourceType"
              control={control}
              render={({ field }) => (
                <Select
                  label="Source Type"
                  size="sm"
                  {...field}
                  disabledKeys={["DOCUMENTS"]}
                  defaultSelectedKeys={["YOUTUBE"]}
                >
                  <SelectItem key="MIXED">Mixed Sources</SelectItem>
                  <SelectItem key="YOUTUBE">YouTube Videos</SelectItem>
                  <SelectItem key="DOCUMENTS">Documents</SelectItem>
                  <SelectItem key="TEXT">Custom Text</SelectItem>
                </Select>
              )}
            />

            {/* YouTube URLs */}
            {(sourceType === "YOUTUBE" || sourceType === "MIXED") && (
              <div className="space-y-2">
                <div className="flex gap-2 items-end">
                  <Input
                    label="Add YouTube URL"
                    size="sm"
                    placeholder="Press Enter or click +"
                    value={newYouTubeURL} // Add a state for the new URL
                    onChange={(e) => setNewYouTubeURL(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newYouTubeURL.trim() !== "") {
                        e.preventDefault(); // Prevent form submission
                        const updatedURLs = [...youtubeURLs, newYouTubeURL];
                        setValue("youtubeURLs", updatedURLs, {
                          shouldValidate: true,
                        });
                        setNewYouTubeURL("");
                      }
                    }}
                    isInvalid={!!errors.youtubeURLs}
                    errorMessage={errors.youtubeURLs?.message as string}
                  />
                  <Button
                    isIconOnly
                    color="primary"
                    onPress={() => {
                      if (newYouTubeURL.trim() !== "") {
                        addYouTubeURL(newYouTubeURL);
                        setNewYouTubeURL("");
                      }
                    }}
                  >
                    <Plus />
                  </Button>
                </div>

                {youtubeURLs.map((url, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={url}
                      onChange={(e) => {
                        const updatedURLs = [...youtubeURLs];
                        updatedURLs[index] = e.target.value;
                        setValue("youtubeURLs", updatedURLs, {
                          shouldValidate: true,
                        });
                      }}
                      placeholder="YouTube URL"
                      isInvalid={!!errors.youtubeURLs?.[index]}
                      errorMessage={
                        errors.youtubeURLs?.[index]?.message as string
                      }
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onPress={() => {
                        const updatedURLs = youtubeURLs.filter(
                          (_, i) => i !== index
                        );
                        setValue("youtubeURLs", updatedURLs, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {(sourceType === "TEXT" || sourceType === "MIXED") && (
              <Controller
                name="customText"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label="Custom Text"
                    size="sm"
                    {...field}
                    className="lg:col-span-2"
                    isInvalid={Boolean(errors.customText)}
                    errorMessage={errors.customText?.message}
                  />
                )}
              />
            )}

            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-end">
              <Button
                color="primary"
                type="submit"
                isLoading={isPending}
                endContent={<MagicWand size={20} />}
              >
                Create Clone
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
