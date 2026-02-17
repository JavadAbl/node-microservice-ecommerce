// src/components/vehicles/create-vehicle-form.tsx
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
import { Alert, AlertDescription } from "@/components/ui/alert";

import { type VehicleFormState } from "@/app/actions/vehicle-actions";

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

interface CreateVehicleFormProps {
  action: (formData: FormData) => Promise<VehicleFormState>;
  customers: { id: number; name: string }[];
  initialState?: VehicleFormState;
}

export function CreateVehicleForm({
  action,
  customers,
  initialState,
}: CreateVehicleFormProps) {
  const state = initialState;

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
          {/* Success/Error Alerts */}
          {state?.success && (
            <Alert className="mb-6 bg-primary/10 border-primary text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription>Vehicle created successfully!</AlertDescription>
            </Alert>
          )}

          {state?.error && (
            <Alert className="mb-6 bg-destructive/10 border-destructive text-foreground">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <Form action={action}>
            <div className="space-y-8">
              {/* Section 1: Identification */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                  Identification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormItem>
                    <FormLabel className="text-foreground">VIN *</FormLabel>
                    <FormControl>
                      <Input
                        name="vin"
                        placeholder="17-character VIN"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.vin}
                      />
                    </FormControl>
                    {state?.fieldErrors?.vin && (
                      <FormMessage>{state.fieldErrors.vin[0]}</FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">
                      License Plate
                    </FormLabel>
                    <FormControl>
                      <Input
                        name="licensePlate"
                        placeholder="ABC-123"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.licensePlate}
                      />
                    </FormControl>
                    {state?.fieldErrors?.licensePlate && (
                      <FormMessage>
                        {state.fieldErrors.licensePlate[0]}
                      </FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">
                      State/Region
                    </FormLabel>
                    <FormControl>
                      <Input
                        name="state"
                        placeholder="CA"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.state}
                      />
                    </FormControl>
                    {state?.fieldErrors?.state && (
                      <FormMessage>{state.fieldErrors.state[0]}</FormMessage>
                    )}
                  </FormItem>
                </div>
              </div>

              {/* Section 2: Vehicle Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                  Vehicle Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormItem>
                    <FormLabel className="text-foreground">Make *</FormLabel>
                    <FormControl>
                      <Input
                        name="make"
                        placeholder="Toyota"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.make}
                      />
                    </FormControl>
                    {state?.fieldErrors?.make && (
                      <FormMessage>{state.fieldErrors.make[0]}</FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">Model *</FormLabel>
                    <FormControl>
                      <Input
                        name="model"
                        placeholder="Camry"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.model}
                      />
                    </FormControl>
                    {state?.fieldErrors?.model && (
                      <FormMessage>{state.fieldErrors.model[0]}</FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">Year *</FormLabel>
                    <FormControl>
                      <Input
                        name="year"
                        type="number"
                        placeholder="2024"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.year}
                      />
                    </FormControl>
                    {state?.fieldErrors?.year && (
                      <FormMessage>{state.fieldErrors.year[0]}</FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">Trim</FormLabel>
                    <FormControl>
                      <Input
                        name="trim"
                        placeholder="XLE"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.trim}
                      />
                    </FormControl>
                    {state?.fieldErrors?.trim && (
                      <FormMessage>{state.fieldErrors.trim[0]}</FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">Color</FormLabel>
                    <FormControl>
                      <Input
                        name="color"
                        placeholder="Silver"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.color}
                      />
                    </FormControl>
                    {state?.fieldErrors?.color && (
                      <FormMessage>{state.fieldErrors.color[0]}</FormMessage>
                    )}
                  </FormItem>
                </div>
              </div>

              {/* Section 3: Mechanics & Specs */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                  Mechanics & Specs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormItem>
                    <FormLabel className="text-foreground">Fuel Type</FormLabel>
                    <Select
                      name="fuelType"
                      defaultValue={state?.formData?.fuelType}
                    >
                      <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FUEL_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {state?.fieldErrors?.fuelType && (
                      <FormMessage>{state.fieldErrors.fuelType[0]}</FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">
                      Transmission
                    </FormLabel>
                    <Select
                      name="transmission"
                      defaultValue={state?.formData?.transmission}
                    >
                      <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRANSMISSION_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {state?.fieldErrors?.transmission && (
                      <FormMessage>
                        {state.fieldErrors.transmission[0]}
                      </FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">Engine</FormLabel>
                    <FormControl>
                      <Input
                        name="engine"
                        placeholder="2.5L 4-Cylinder"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.engine}
                      />
                    </FormControl>
                    {state?.fieldErrors?.engine && (
                      <FormMessage>{state.fieldErrors.engine[0]}</FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">
                      Current Mileage
                    </FormLabel>
                    <FormControl>
                      <Input
                        name="mileage"
                        type="number"
                        placeholder="0"
                        className="bg-background text-foreground border-input focus-visible:ring-ring"
                        defaultValue={state?.formData?.mileage}
                      />
                    </FormControl>
                    {state?.fieldErrors?.mileage && (
                      <FormMessage>{state.fieldErrors.mileage[0]}</FormMessage>
                    )}
                  </FormItem>
                </div>
              </div>

              {/* Section 4: Ownership & Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                  Ownership & Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Customer *
                    </FormLabel>
                    <Select
                      name="customerId"
                      defaultValue={state?.formData?.customerId}
                    >
                      <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.length > 0 ? (
                          customers.map((customer) => (
                            <SelectItem
                              key={customer.id}
                              value={customer.id.toString()}
                            >
                              {customer.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-customers" disabled>
                            No customers available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {state?.fieldErrors?.customerId && (
                      <FormMessage>
                        {state.fieldErrors.customerId[0]}
                      </FormMessage>
                    )}
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-foreground">Status</FormLabel>
                    <Select
                      name="status"
                      defaultValue={state?.formData?.status || "Active"}
                    >
                      <SelectTrigger className="bg-background text-foreground border-input focus:ring-ring">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {VEHICLE_STATUS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {state?.fieldErrors?.status && (
                      <FormMessage>{state.fieldErrors.status[0]}</FormMessage>
                    )}
                  </FormItem>
                </div>

                <FormItem>
                  <FormLabel className="text-foreground">
                    Description / Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      name="description"
                      placeholder="Any additional details about the vehicle condition..."
                      className="bg-background text-foreground border-input focus-visible:ring-ring min-h-[100px]"
                      defaultValue={state?.formData?.description}
                    />
                  </FormControl>
                  {state?.fieldErrors?.description && (
                    <FormMessage>
                      {state.fieldErrors.description[0]}
                    </FormMessage>
                  )}
                </FormItem>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  formAction={() => window.location.reload()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Create Vehicle
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
