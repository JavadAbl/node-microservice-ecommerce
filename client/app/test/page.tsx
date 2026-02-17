"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, Save, Car } from "lucide-react";

// Assuming standard shadcn/ui components are installed in @/components/ui/...
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

// --- Enums from Prisma Schema ---
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

// --- Mock Data for Customer Selection ---
// In a real app, this would be fetched via server action or API
const CUSTOMER_OPTIONS = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Acme Corp Fleet" },
];

// --- Validation Schema ---
const vehicleFormSchema = z.object({
  vin: z.string().min(1, "VIN is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  trim: z.string().optional(),
  fuelType: z.enum(FUEL_TYPES).optional(),
  transmission: z.enum(TRANSMISSION_TYPES).optional(),
  engine: z.string().optional(),
  color: z.string().optional(),
  mileage: z.coerce.number().nonnegative().optional(),
  licensePlate: z.string().optional(),
  state: z.string().optional(),
  status: z.enum(VEHICLE_STATUS).default("Active"),
  description: z.string().optional(),
  customerId: z.coerce.number().min(1, "Customer is required"),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export default function CreateVehicleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      status: "Active",
      mileage: 0,
      year: new Date().getFullYear(),
    },
  });

  async function onSubmit(data: VehicleFormValues) {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual Server Action call
      // await createVehicleAction(data);
      console.log("Form Submitted:", data);
      alert("Vehicle created successfully (UI Demo)");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <FormLabel className="text-foreground">VIN *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="17-character VIN"
                            className="bg-background text-foreground border-input focus-visible:ring-ring"
                            {...field}
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            {...field}
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
                        <FormLabel className="text-foreground">Trim</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="XLE"
                            className="bg-background text-foreground border-input focus-visible:ring-ring"
                            {...field}
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
                        <FormLabel className="text-foreground">Color</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Silver"
                            className="bg-background text-foreground border-input focus-visible:ring-ring"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Section 3: Mechanics */}
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Section 4: Ownership & Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                  Ownership & Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Customer *
                        </FormLabel>
                        <Select
                          onValueChange={(val) => field.onChange(parseInt(val))}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                              <SelectValue placeholder="Select customer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CUSTOMER_OPTIONS.map((customer) => (
                              <SelectItem
                                key={customer.id}
                                value={customer.id.toString()}
                              >
                                {customer.name}
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
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {VEHICLE_STATUS.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
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
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Vehicle
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
