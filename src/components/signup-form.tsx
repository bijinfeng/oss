import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, type FC } from "react";

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
import { Loading } from "./loading";

export const formSchema = z.object({
  username: z.string({ required_error: "请填写姓名" }),
  email: z.string({ required_error: "请填写邮箱" }).email({
    message: "请填写正确的邮箱格式",
  }),
  password: z.string({ required_error: "请填写密码" }),
});

export type FormValue = z.infer<typeof formSchema>;

interface SignupFormProps {
  onSubmit: (values: FormValue) => void;
}

export const SignupForm: FC<SignupFormProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (value: FormValue) => {
    setLoading(true);
    try {
      await onSubmit(value);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loading size={18} className="mr-1" />}
          Create new account
        </Button>
      </form>
    </Form>
  );
};
