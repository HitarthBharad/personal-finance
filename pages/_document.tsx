import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "@/components/ui/sonner"

export default function Document() {
    return (
        <Html lang="en" suppressHydrationWarning>
            <Head>
            </Head>
            <body className="min-h-screen bg-background font-sans antialiased">
                <Main />
                <NextScript />
                <Toaster />
            </body>
        </Html>
    );
}