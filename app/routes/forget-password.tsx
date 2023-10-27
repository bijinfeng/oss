import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "@remix-run/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { forgetPassword } from "~/lib/request";

export const formSchema = z.object({
  email: z.string({ required_error: "请填写邮箱" }).email({
    message: "请填写正确的邮箱格式",
  }),
});

export type FormValue = z.infer<typeof formSchema>;

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (value: FormValue) => {
    await forgetPassword(value.email);
    toast({
      description:
        "If you registered using your email and password, you will receive a password reset email.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <h3 className="font-semibold tracking-tight text-2xl">
          Reset Your Password
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Type in your email and we'll send you a link to reset your password
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 py-4"
          >
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
            <Button type="submit" className="w-full">
              Send Reset Email
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-muted-foreground">
          <span className="mr-1">Already have an account?</span>
          <Link className="underline" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
