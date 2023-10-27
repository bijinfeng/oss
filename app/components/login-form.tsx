import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "@remix-run/react";
import { useState, type FC } from "react";

import { Loading } from "./loading";
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
  email: z.string({ required_error: "请填写邮箱" }).email({
    message: "请填写正确的邮箱格式",
  }),
  password: z.string({ required_error: "请输入密码" }),
});

export type FormValue = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (values: FormValue) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
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
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link className="text-xs underline" to="/forget-password">
                  I forget password
                </Link>
              </div>
              <FormControl>
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loading size={18} className="mr-1" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
};
