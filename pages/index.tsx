"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const loginFormSchema = z.object({
    username: z.string(),
    password: z.string()
});

const LoginForm = () => {

    const { push } = useRouter();
	const { data: session, status } = useSession();

    useEffect(() => {
		if (status === "authenticated") push(`/pnl`);
	}, [session, status]);

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });

    const onSubmit = async ({ username, password }: {username: string, password: string}) => {
		let user = await signIn("credentials", {
			username,
			password,
			redirect: false,
		});

		if (user?.ok === false) {
            console.log("Authentication Failed")
        };
	};

    const { isSubmitting, isValid } = form.formState;

    if(isSubmitting) (
        <Loader />
    )

    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center min-h-screen p-4 bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                          disabled={isSubmitting}
                          placeholder="Enter username"
                          {...field}
                        />
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
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                          disabled={isSubmitting}
                          type="password"
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      );
};

export default LoginForm;