"use client";
import Input from "@/input";
import VolumeCard from "@/volumecard";
import { Series } from "@prisma/client";
import { useEffect, useState } from "react";
import { FormChild, VolumeFields } from "./page";
import { UseFormSetValue } from "react-hook-form";
export default function Info({
  errors,
  setValue,
  register,
  watch,
  series,
  newSeriesModalRef,
}: {
  errors: FormChild["errors"];
  setValue: UseFormSetValue<VolumeFields>;
  register: FormChild["register"];
  watch: FormChild["watch"];
  series: Series[];
  newSeriesModalRef: React.RefObject<HTMLDialogElement>;
}): JSX.Element {
  const [coverUri, setCoverUri] = useState("");

  const seriesEnglishName = watch("seriesEnglishName");
  const volumeNumber = watch("volumeNumber");
  const coverFile = watch("coverImage");

  useEffect(() => {
    if (coverFile && coverFile[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setCoverUri(e.target.result);
        }
      };
      reader.readAsDataURL(coverFile[0]);
    }
  }, [coverFile]);
  return (
    <div className="card bg-base-300 rounded-box">
      <div className="items-center card-body">
        <h2 className="card-seriesId">Basic Info</h2>
        <div className="flex flex-row justify-around w-full">
          <div className="flex flex-col justify-between items-center w-1/2">
            <div className="w-full max-w-xs">
              <label className="label">
                <span className="label-text">Manga Series</span>
              </label>
              <select
                className="w-full max-w-xs select"
                defaultValue="Manga Series"
                {...register("seriesEnglishName", {
                  required: "Manga Series is required",
                  // TODO: don't let this be "Add New" or something
                })}
                onChange={(e) => {
                  if (e.target.value == "Add New") {
                    newSeriesModalRef.current?.showModal();
                  } else {
                    setValue("seriesEnglishName", e.target.value);
                  }
                }}
              >
                <option disabled>Manga Series</option>
                {series.map((series) => (
                  <option key={series.englishName} value={series.englishName}>
                    {series.englishName}
                  </option>
                ))}
                <option key="new" className="font-bold">
                  Add New
                </option>
              </select>
            </div>
            <Input
              label="Volume Number"
              type="number"
              defaultValue="1"
              errors={errors?.volumeNumber || null}
              register={register("volumeNumber", {
                required: "Volume Number is required",
                min: { value: 0, message: "Volume Number must be positive" },
              })}
            />
            <Input
              label="Cover Image"
              type="file"
              extraProperties={{ accept: "image/*" }}
              classNameOverride={`w-full max-w-xs file-input file-input-bordered ${
                errors?.coverImage && "file-input-error"
              }`}
              errors={errors?.coverImage || null}
              register={register("coverImage", {
                required: "Cover Image is required",
              })}
            />
          </div>
          <div className="flex flex-col items-center w-1/2">
            <VolumeCard
              coverUri={
                coverUri == "" ? "https://placekitten.com/400/540" : coverUri
              }
              href="#"
              seriesName={seriesEnglishName || "Manga Series"}
              volumeNumber={volumeNumber || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
