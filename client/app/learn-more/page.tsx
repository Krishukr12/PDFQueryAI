import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  RocketIcon,
  FileTextIcon,
  CpuIcon,
  DatabaseIcon,
  CloudIcon,
  Lock,
} from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-10 text-center ">
        <Badge
          variant="outline"
          className="mb-4 bg-primary/10 text-primary hover:bg-primary/20"
        >
          AI-Powered Document Analysis
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
          Revolutionize How You Interact with Documents
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          PDFQueryAI combines cutting-edge AI technology with intuitive design
          to transform static PDFs into interactive knowledge bases.
        </p>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">
                <RocketIcon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Instant Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ask complex questions in natural language and get precise
                answers extracted from your documents within seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Enterprise Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Military-grade encryption with regular security audits and
                role-based access control.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">
                <CpuIcon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Smart Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced NLP models that understand context and maintain
                conversation history.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Powered by Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-background rounded-lg border border-border">
              <FileTextIcon className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="font-semibold">React & Next.js</h3>
              <p className="text-sm text-muted-foreground">
                Frontend Framework
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <DatabaseIcon className="h-12 w-12 mx-auto text-chart-3 mb-4" />
              <h3 className="font-semibold">MongoDB Atlas</h3>
              <p className="text-sm text-muted-foreground">Database System</p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <CloudIcon className="h-12 w-12 mx-auto text-chart-5 mb-4" />
              <h3 className="font-semibold">AWS S3</h3>
              <p className="text-sm text-muted-foreground">Cloud Storage</p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-12 w-12 mx-auto text-chart-2 mb-4"
              >
                <path d="M20.31 4.061l-7.89 7.889 7.89 7.889-1.06 1.061-7.889-7.89-7.889 7.89-1.061-1.061 7.89-7.889-7.89-7.889 1.061-1.061 7.889 7.89 7.889-7.89 1.06 1.061z" />
              </svg>
              <h3 className="font-semibold">OpenAI GPT</h3>
              <p className="text-sm text-muted-foreground">AI Engine</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="security">
            <AccordionTrigger className="text-lg">
              How secure is my data?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              All documents are encrypted at rest and in transit. We undergo
              regular third-party security audits and comply with GDPR
              regulations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="formats">
            <AccordionTrigger className="text-lg">
              What file formats are supported?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Currently we support PDF files up to 25MB. DOCX and TXT support
              coming in Q4 2024.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pricing">
            <AccordionTrigger className="text-lg">
              What&apos;s the pricing model?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Free tier available with 50 pages/month. Pro plans start at
              $29/month with advanced features and priority support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default page;
