"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define the Schema
// Use .nullable() to allow null.
// We also preprocess the value to turn empty strings into null.
const schema = z.object({
  /*  age: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z.number().nullable(),
  ), */
  // Alternative simpler method (see below for explanation)
  age: z.number().nullable(),
});

type FormSchema = z.infer<typeof schema>;

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: null, // Initialize as null
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data); // { age: null } or { age: 25 }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Age (Optional)</label>
      <input
        type="number"
        {...register("age", {
          // 2. Manual value handling (Alternative to z.preprocess)
          // setValueAs: (v) => (v === "" ? null : v === null ? null : Number(v)),
        })}
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
