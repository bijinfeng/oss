import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@vercel/remix";
import { useLoaderData, useFetcher } from "@remix-run/react";

import { ForgetPasswordLayout } from "~/components/forget-password-layout";
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
import { resetPassword } from "~/lib/request";
import { setAuthSession } from "~/lib/auth.server";
import { commitSession } from "~/lib/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await setAuthSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const code = search.get("code");

  if (!code) return redirect("/login");

  return json({ code });
};

export const formSchema = z
  .object({
    password: z.string({ required_error: "请输入密码" }),
    passwordConfirmation: z.string({ required_error: "请输入密码" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export type FormValue = z.infer<typeof formSchema>;

const ResetPassword = () => {
  const { code } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (value: FormValue) => {
    const data = await resetPassword({ ...value, code });
    fetcher.submit({ userId: data.user.id, jwt: data.jwt }, { method: "post" });
  };

  return (
    <ForgetPasswordLayout
      heading="Reset Your Password"
      subheading="Type in a new secure password and press save to update your password"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 py-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your confirmation password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Save New Password
          </Button>
        </form>
      </Form>
    </ForgetPasswordLayout>
  );
};

export default ResetPassword;
