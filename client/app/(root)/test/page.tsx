"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Validation Schema
const vehicleFormSchema = z.object({
  vin: z
    .string()
    .min(17, "VIN must be 17 characters")
    .max(17, "VIN must be 17 characters")
    .toUpperCase(),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .min(1900, "Year must be valid")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  trim: z.string().optional(),
  fuelType: z
    .enum([
      "Gasoline",
      "Diesel",
      "Electric",
      "Hybrid",
      "PlugInHybrid",
      "Hydrogen",
      "Other",
    ])
    .optional(),
  transmission: z
    .enum(["Automatic", "Manual", "CVT", "DualClutch", "Robotic", "Other"])
    .optional(),
  engine: z.string().optional(),
  color: z.string().optional(),
  mileage: z
    .number()
    .min(0, "Mileage cannot be negative")
    .optional()
    .or(z.literal("")),
  licensePlate: z.string().optional(),
  state: z.string().optional(),
  status: z.enum([
    "Active",
    "InRepair",
    "ReadyForPickup",
    "Archived",
    "UnderWarranty",
    "InService",
    "OnLoan",
    "NotOperational",
  ]),
  description: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

const defaultValues: Partial<VehicleFormValues> = {
  status: "Active",
  mileage: undefined,
};

export function CreateVehicleForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(values: VehicleFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create vehicle");
      }

      const data = await response.json();
      console.log("Vehicle created:", data);
      form.reset();
      // You can add a success toast here
    } catch (error) {
      console.error("Error creating vehicle:", error);
      // You can add an error toast here
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Vehicle</CardTitle>
          <CardDescription>Add a new vehicle to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="specifications">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="additional">Additional</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* VIN */}
                    <FormField
                      control={form.control}
                      name="vin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VIN *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter 17-character VIN"
                              {...field}
                              maxLength={17}
                              className="uppercase"
                            />
                          </FormControl>
                          <FormDescription>
                            Vehicle Identification Number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Make */}
                    <FormField
                      control={form.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Make *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Toyota, Honda, BMW"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Model */}
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Camry, Civic, 3 Series"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Year */}
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 2023"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Trim */}
                    <FormField
                      control={form.control}
                      name="trim"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trim</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., SE, LE, XLE" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Status */}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="InRepair">
                                In Repair
                              </SelectItem>
                              <SelectItem value="ReadyForPickup">
                                Ready For Pickup
                              </SelectItem>
                              <SelectItem value="Archived">Archived</SelectItem>
                              <SelectItem value="UnderWarranty">
                                Under Warranty
                              </SelectItem>
                              <SelectItem value="InService">
                                In Service
                              </SelectItem>
                              <SelectItem value="OnLoan">On Loan</SelectItem>
                              <SelectItem value="NotOperational">
                                Not Operational
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Specifications Tab */}
                <TabsContent value="specifications" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fuel Type */}
                    <FormField
                      control={form.control}
                      name="fuelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fuel type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Gasoline">Gasoline</SelectItem>
                              <SelectItem value="Diesel">Diesel</SelectItem>
                              <SelectItem value="Electric">Electric</SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                              <SelectItem value="PlugInHybrid">
                                Plug-in Hybrid
                              </SelectItem>
                              <SelectItem value="Hydrogen">Hydrogen</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Transmission */}
                    <FormField
                      control={form.control}
                      name="transmission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transmission</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select transmission" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Automatic">
                                Automatic
                              </SelectItem>
                              <SelectItem value="Manual">Manual</SelectItem>
                              <SelectItem value="CVT">CVT</SelectItem>
                              <SelectItem value="DualClutch">
                                Dual Clutch
                              </SelectItem>
                              <SelectItem value="Robotic">Robotic</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Engine */}
                    <FormField
                      control={form.control}
                      name="engine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Engine</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 2.5L V6, 3.0L Turbo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Color */}
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Black, Silver, Red"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Mileage */}
                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mileage (km)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 45000"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined,
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Additional Information Tab */}
                <TabsContent value="additional" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* License Plate */}
                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., ABC-1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* State */}
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., CA, NY, TX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any additional notes or details about the vehicle..."
                            className="resize-none"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional field for additional vehicle information
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              {/* Form Actions */}
              <div className="flex justify-between gap-4 pt-6 border-t">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Vehicle"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
