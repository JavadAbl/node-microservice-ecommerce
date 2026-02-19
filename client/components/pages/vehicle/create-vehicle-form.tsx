"use client";

import { useState, useTransition } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createVehicleAction } from "@/lib/features/vehicle/actions/create-vehicle-action";
import {
  CreateVehicle,
  createVehicleSchema,
} from "@/lib/features/vehicle/schema/create-vehicle-schema";

const FUEL_TYPES = [
  "Gasoline",
  "Diesel",
  "Electric",
  "Hybrid",
  "PlugInHybrid",
  "Hydrogen",
  "Other",
] as const;

const TRANSMISSION_TYPES = [
  "Automatic",
  "Manual",
  "CVT",
  "DualClutch",
  "Robotic",
  "Other",
] as const;

const VEHICLE_STATUS = [
  "Active",
  "InRepair",
  "ReadyForPickup",
  "Archived",
  "UnderWarranty",
  "InService",
  "OnLoan",
  "NotOperational",
] as const;

export function CreateVehicleForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const form = useForm({
    //  resolver: zodResolver(createVehicleSchema) as Resolver<CreateVehicle>,
    defaultValues: {
      status: "Active" as any,
      // If your schema has optional strings, you can omit them
      // If it expects numbers, keep them undefined until input
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: CreateVehicle) {
    console.log(123);
    setServerError(null);
    setServerSuccess(null);

    startTransition(async () => {
      const result = await createVehicleAction(values);

      if (!result?.success) {
        setServerError(result?.error ?? "Failed to create vehicle.");

        // Map server fieldErrors back to RHF
        if (result?.fieldErrors) {
          for (const [key, msgs] of Object.entries(result.fieldErrors)) {
            const message = msgs?.[0];
            if (!message) continue;

            form.setError(key as keyof CreateVehicle, {
              type: "server",
              message,
            });
          }
        }

        return;
      }

      setServerSuccess("Vehicle created successfully!");
      form.reset({ status: "Active" as any });
    });
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Card className="bg-card text-card-foreground border-border shadow-sm">
        <CardHeader className="border-b border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Register New Vehicle
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter the details of the vehicle to add it to the system.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {serverSuccess && (
            <Alert className="mb-6 bg-primary/10 border-primary text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription>{serverSuccess}</AlertDescription>
            </Alert>
          )}

          {serverError && (
            <Alert className="mb-6 bg-destructive/10 border-destructive text-foreground">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8">
                {/* Section 1: Identification */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                    Identification
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="vin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            VIN *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="17-character VIN"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            License Plate
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ABC-123"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              {...field}
                              value={field.value ?? ""} // for optional fields
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            State/Region
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="CA"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 2: Vehicle Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                    Vehicle Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Make *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Toyota"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Model *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Camry"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Year - important: number parsing */}
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Year *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="2024"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              value={field.value ?? ""}
                              onChange={(e) => {
                                const v = e.target.value;
                                field.onChange(
                                  v === "" ? undefined : Number(v),
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="trim"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Trim
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="XLE"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Color
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Silver"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 3: Mechanics & Specs */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                    Mechanics & Specs
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="fuelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Fuel Type
                          </FormLabel>
                          <Select
                            value={(field.value as string | undefined) ?? ""}
                            onValueChange={(v) => field.onChange(v)}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                                <SelectValue placeholder="Select fuel type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {FUEL_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transmission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Transmission
                          </FormLabel>
                          <Select
                            value={(field.value as string | undefined) ?? ""}
                            onValueChange={(v) => field.onChange(v)}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                                <SelectValue placeholder="Select transmission" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TRANSMISSION_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="engine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Engine
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="2.5L 4-Cylinder"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* mileage - number parsing */}
                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Current Mileage
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              className="bg-background text-foreground border-input focus-visible:ring-ring"
                              value={field.value ?? ""}
                              onChange={(e) => {
                                const v = e.target.value;
                                field.onChange(
                                  v === "" ? undefined : Number(v),
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 4: Status & Notes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                    Ownership & Status
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Status
                          </FormLabel>
                          <Select
                            value={
                              (field.value as string | undefined) ?? "Active"
                            }
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {VEHICLE_STATUS.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Description / Notes
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional details about the vehicle condition..."
                            className="bg-background text-foreground border-input focus-visible:ring-ring min-h-[100px]"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      setServerError(null);
                      setServerSuccess(null);
                      form.reset({ status: "Active" as any });
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isPending ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Vehicle
                      </>
                    )}
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
