import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLoaderData } from "react-router";
import { Controller, useForm, useWatch } from "react-hook-form";

function SendParcel() {
  const serviceCenters = useLoaderData();
  const {
    control,
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "document",
      parcelName: "",
      parcelWeight: "",
      senderName: "",
      senderAddress: "",
      senderPhone: "",
      senderRegion: "",
      senderDistrict: "",
      pickupInstruction: "",
      receiverName: "",
      receiverAddress: "",
      receiverContact: "",
      receiverDistrict: "",
      deliveryInstruction: "",
    },
  });

  const activeServiceCenters = useMemo(
    () =>
      (Array.isArray(serviceCenters) ? serviceCenters : []).filter(
        (center) => center.status === "active",
      ),
    [serviceCenters],
  );
  const regions = useMemo(
    () => [...new Set(activeServiceCenters.map((center) => center.region))],
    [activeServiceCenters],
  );
  const allDistricts = useMemo(
    () => [...new Set(activeServiceCenters.map((center) => center.district))],
    [activeServiceCenters],
  );
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const senderDistricts = useMemo(
    () =>
      [...new Set(
        activeServiceCenters
          .filter((center) => center.region === senderRegion)
          .map((center) => center.district),
      )],
    [activeServiceCenters, senderRegion],
  );

  useEffect(() => {
    resetField("senderDistrict");
  }, [resetField, senderRegion]);

  const onSubmit = (data) => {
    console.log("parcel booking data:", data);
  };

  const fieldError = (field) =>
    errors[field] && <p className="text-sm text-red-600">{errors[field].message}</p>;

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-[#03373d] sm:px-10 lg:px-20">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black tracking-normal sm:text-5xl">
          Send A Parcel
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12" noValidate>
          <h2 className="text-2xl font-extrabold tracking-normal">
            Enter your parcel details
          </h2>

          <Separator className="my-8" />

          <div className="flex flex-wrap items-center gap-10">
            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
              <input
                type="radio"
                name="parcelType"
                value="document"
                {...register("parcelType")}
                className="h-5 w-5 accent-green-600"
              />
              Document
            </label>

            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
              <input
                type="radio"
                name="parcelType"
                value="non-document"
                {...register("parcelType")}
                className="h-5 w-5 accent-green-600"
              />
              Non-Document
            </label>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="parcelName">Parcel Name</Label>
              <Input
                id="parcelName"
                name="parcelName"
                {...register("parcelName", { required: "Parcel name is required." })}
                placeholder="Parcel Name"
                required
                className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
              />
              {fieldError("parcelName")}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="parcelWeight">Parcel Weight (KG)</Label>
              <Input
                id="parcelWeight"
                name="parcelWeight"
                type="number"
                min="0"
                step="0.1"
                {...register("parcelWeight", {
                  required: "Parcel weight is required.",
                  min: { value: 0.1, message: "Weight must be greater than 0." },
                })}
                placeholder="Parcel Weight (KG)"
                required
                className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
              />
              {fieldError("parcelWeight")}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-10 lg:grid-cols-2">
            <section>
              <h3 className="mb-7 text-lg font-extrabold">Sender Details</h3>

              <div className="space-y-5">
                <div className="grid gap-1.5">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    {...register("senderName", { required: "Sender name is required." })}
                    placeholder="Sender Name"
                    required
                    className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                  />
                  {fieldError("senderName")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="senderAddress">Address</Label>
                  <Input
                    id="senderAddress"
                    {...register("senderAddress", { required: "Sender address is required." })}
                    placeholder="Address"
                    required
                    className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                  />
                  {fieldError("senderAddress")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="senderPhone">Sender Phone No</Label>
                  <Input
                    id="senderPhone"
                    type="tel"
                    {...register("senderPhone", {
                      required: "Sender phone number is required.",
                      pattern: {
                        value: /^(?:\\+8801|01)\\d{9}$/,
                        message: "Enter a valid Bangladeshi phone number.",
                      },
                    })}
                    placeholder="Sender Phone No"
                    required
                    className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                  />
                  {fieldError("senderPhone")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="senderRegion">Sender Region</Label>
                  <Controller
                    name="senderRegion"
                    control={control}
                    rules={{ required: "Select the sender's region." }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="senderRegion" className="h-10 border-slate-300 focus:border-lime-400 focus:ring-lime-200/70">
                          <SelectValue placeholder="Select sender region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => <SelectItem key={region} value={region}>{region}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {fieldError("senderRegion")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="senderDistrict">Sender District</Label>
                  <Controller
                    name="senderDistrict"
                    control={control}
                    rules={{ required: "Select the sender's district." }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} disabled={!senderRegion}>
                        <SelectTrigger id="senderDistrict" className="h-10 border-slate-300 focus:border-lime-400 focus:ring-lime-200/70">
                          <SelectValue placeholder={senderRegion ? "Select sender district" : "Choose a region first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {senderDistricts.map((district) => <SelectItem key={district} value={district}>{district}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {fieldError("senderDistrict")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="pickupInstruction">Pickup Instruction</Label>
                  <Textarea
                    id="pickupInstruction"
                    {...register("pickupInstruction")}
                    placeholder="Pickup Instruction"
                    className="min-h-24 resize-none border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-7 text-lg font-extrabold">Receiver Details</h3>

              <div className="space-y-5">
                <div className="grid gap-1.5">
                  <Label htmlFor="receiverName">Receiver Name</Label>
                  <Input
                    id="receiverName"
                    {...register("receiverName", { required: "Receiver name is required." })}
                    placeholder="Receiver Name"
                    required
                    className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                  />
                  {fieldError("receiverName")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="receiverAddress">Receiver Address</Label>
                  <Input
                    id="receiverAddress"
                    {...register("receiverAddress", { required: "Receiver address is required." })}
                    placeholder="Address"
                    required
                    className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                  />
                  {fieldError("receiverAddress")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="receiverContact">Receiver Contact No</Label>
                  <Input
                    id="receiverContact"
                    type="tel"
                    {...register("receiverContact", {
                      required: "Receiver phone number is required.",
                      pattern: {
                        value: /^(?:\\+8801|01)\\d{9}$/,
                        message: "Enter a valid Bangladeshi phone number.",
                      },
                    })}
                    placeholder="Receiver Contact No"
                    required
                    className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                  />
                  {fieldError("receiverContact")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="receiverDistrict">Receiver District</Label>
                  <Controller
                    name="receiverDistrict"
                    control={control}
                    rules={{ required: "Select the receiver's district." }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="receiverDistrict" className="h-10 border-slate-300 focus:border-lime-400 focus:ring-lime-200/70">
                          <SelectValue placeholder="Select receiver district" />
                        </SelectTrigger>
                        <SelectContent>
                          {allDistricts.map((district) => <SelectItem key={district} value={district}>{district}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {fieldError("receiverDistrict")}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="deliveryInstruction">
                    Delivery Instruction
                  </Label>
                  <Textarea
                    id="deliveryInstruction"
                    {...register("deliveryInstruction")}
                    placeholder="Delivery Instruction"
                    className="min-h-24 resize-none border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                  />
                </div>
              </div>
            </section>
          </div>

          <p className="mt-10 text-sm text-slate-950">
            * Pickup Time 4pm-7pm Approx.
          </p>

          <Button
            type="submit"
            className="mt-10 h-10 w-full bg-lime-300 px-8 font-semibold text-slate-950 hover:bg-lime-400 sm:w-auto"
          >
            Proceed to Confirm Booking
          </Button>
        </form>
      </section>
    </main>
  );
}

export default SendParcel;
