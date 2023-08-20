"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";
import { useCallback, useState } from "react";
import classNames from "classnames";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import type { Profile } from "@/app/types/profile";

const schema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  firstName: z.string().min(1, "Can't be empty"),
  lastName: z.string().min(1, "Can't be empty"),
});

type ProfileFormProps = {
  profile: Profile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: profile.email ?? "",
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
    },
  });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length === 0) return;
    setFileToUpload(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg"],
    },
    maxFiles: 1,
    multiple: false,
    onDrop,
  });
  const { startUpload } = useUploadThing("profileUploader");

  const handleSave = handleSubmit(async (data) => {
    if (fileToUpload && !profile.profilePicture) {
      await toast.promise(startUpload([fileToUpload]), {
        loading: "Uploading profile picture...",
        success: <b>Successfully uploaded the profile picture</b>,
        error: (
          <b>
            Something went wrong when uploading the profile picture, please try
            again later...
          </b>
        ),
      });
    }

    const hasChanges = Object.keys(data).some(
      (key) => data[key as keyof typeof data] !== profile[key as keyof Profile]
    );

    if (!hasChanges) {
      return;
    }

    await toast.promise(
      fetch("/api/profiles", {
        method: "PATCH",
        body: JSON.stringify({
          ...data,
        }),
      }),
      {
        loading: "Updating profile information...",
        success: <b>Successfully updated the profile information</b>,
        error: (
          <b>
            Something went wrong when updating the profile information, please
            try again later...
          </b>
        ),
      }
    );
  });

  const hasProfileImage = fileToUpload || profile.profilePicture;

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSave}>
      <div className="flex flex-col gap-10 rounded-xl rounded-b-none bg-white p-6 md:p-10">
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-3xl">Profile Details</h1>
          <p className="text-gray-700">
            Add your details to create a personal touch to your profile.
          </p>
        </section>

        <section className="flex flex-col gap-4 rounded-xl bg-gray-50 p-5 md:flex-row md:items-center md:gap-6">
          <span className="block flex-1 text-gray-700">Profile picture</span>
          <div
            {...getRootProps()}
            className={classNames(
              "relative flex h-[193px] w-[193px] flex-col items-center justify-center overflow-hidden rounded-xl",
              {
                "bg-purple-100": !hasProfileImage,
                "after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-full after:rounded-xl after:bg-black after:bg-opacity-50":
                  hasProfileImage,
              }
            )}
          >
            {hasProfileImage && (
              <Image
                src={
                  fileToUpload
                    ? URL.createObjectURL(fileToUpload)
                    : (profile.profilePicture as string)
                }
                fill
                alt="Profile picture"
                className="object-cover"
              />
            )}
            <input {...getInputProps()} />
            <p
              className={classNames(
                "z-30 flex flex-col items-center gap-2 font-semibold",
                {
                  "text-purple-600": !hasProfileImage,
                  "text-white": hasProfileImage,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 40 40"
              >
                <path
                  className={classNames({
                    "fill-purple-600": !hasProfileImage,
                    "fill-white": hasProfileImage,
                  })}
                  d="M33.75 6.25H6.25a2.5 2.5 0 00-2.5 2.5v22.5a2.5 2.5 0 002.5 2.5h27.5a2.5 2.5 0 002.5-2.5V8.75a2.5 2.5 0 00-2.5-2.5zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 00-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 00-3.535 0L6.25 23.339V8.75h27.5zM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91zM22.5 15.625a1.875 1.875 0 113.75 0 1.875 1.875 0 01-3.75 0z"
                ></path>
              </svg>
              {hasProfileImage ? "Change Image" : "+ Upload Image"}
            </p>
          </div>
          <span className="mt-2 block text-xs text-gray-700 md:max-w-[128px] lg:max-w-[215px]">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </span>
        </section>

        <section className="flex flex-col gap-3 rounded-xl bg-gray-50 p-5 md:mb-28 lg:mb-12">
          <Input
            className="bg-white md:w-80 lg:w-[400px]"
            containerClassName="md:flex md:items-center md:justify-between"
            labelClassName="md:text-base md:text-gray-700"
            label="First name*"
            id="firstName"
            {...register("firstName")}
            error={errors.firstName?.message as string}
          />
          <Input
            className="bg-white md:w-80 lg:w-[400px]"
            containerClassName="md:flex md:items-center md:justify-between"
            labelClassName="md:text-base md:text-gray-700"
            label="Last name*"
            id="lastName"
            {...register("lastName")}
            error={errors.lastName?.message as string}
          />
          <Input
            className="bg-white md:w-80 lg:w-[400px]"
            containerClassName="md:flex md:items-center md:justify-between"
            labelClassName="md:text-base md:text-gray-700"
            label="Email"
            id="email"
            type="email"
            {...register("email")}
            error={errors.email?.message as string}
          />
        </section>
      </div>

      <hr className="border-gray-300" />

      <div className="rounded-xl rounded-t-none bg-white p-4 md:flex md:justify-end md:px-10 md:py-6">
        <Button className="md:w-auto md:px-7" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
