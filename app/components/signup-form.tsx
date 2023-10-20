import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FC } from "react";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export const formSchema = z.object({
  username: z.string({ required_error: "请填写姓名" }),
  email: z.string({ required_error: "请填写邮箱" }).email({
    message: "请填写正确的邮箱格式",
  }),
  password: z.string({ required_error: "请填写密码" }),
});

export type FormValue = z.infer<typeof formSchema>;

interface SignupFormProps {
  onSubmit: (values: FormValue) => void,
}

export const SignupForm: FC<SignupFormProps> = ({ onSubmit }) => {
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="grid gap-4 text-left">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create new account
          </Button>
        </form>
      </Form>
    </div>
  );
};
