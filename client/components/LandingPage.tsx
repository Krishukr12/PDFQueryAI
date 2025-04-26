import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import {
  RocketIcon,
  LockClosedIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const LandingPage: React.FC = () => {
  return (
    <div className=" bg-background">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
          Transform Your PDFs into Knowledge
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Upload, organize, and query your documents with AI-powered search. Get
          instant answers from your PDFs in seconds.
        </p>

        <div className="flex gap-4 justify-center">
          <SignedIn>
            <Link href="/user-chat">
              <Button className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                <RocketIcon className="mr-2 h-5 w-5" />
                Query Your PDFs
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                <RocketIcon className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>

          <Link href="/learn-more">
            <Button variant="outline" className="px-8 py-6 text-lg">
              Learn More
            </Button>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">
                <LightningBoltIcon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Instant Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ask questions in natural language and get precise answers
                extracted from your documents.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">
                <LockClosedIcon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Secure Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Enterprise-grade security with end-to-end encryption and regular
                backups.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <CardTitle>Smart Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Semantic search powered by AI to find exactly what you need
                across all documents.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
