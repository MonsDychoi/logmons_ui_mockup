'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Apple } from 'lucide-react';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI 템플릿이므로 인증 로직 없이 바로 대시보드로 이동
    router.push('/dashboard');
  };

  return (
    <div className={cn('flex min-h-screen items-center justify-center p-6', className)} {...props}>
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-[#3ecf8e]/10 flex items-center justify-center">
                      <svg className="h-6 w-6 text-[#3ecf8e]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                    </div>
                    <h1 className="text-2xl font-bold">LogMons</h1>
                  </div>
                  <h2 className="text-xl font-semibold">Welcome back</h2>
                  <p className="text-muted-foreground text-sm">
                    Login to your Acme Inc account
                  </p>
                </div>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="text-primary text-sm hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </Field>

                <Field>
                  <Button
                    type="submit"
                    className="w-full bg-[#3ecf8e] hover:bg-[#3ecf8e]/90 text-white"
                  >
                    Login
                  </Button>
                </Field>

                <FieldSeparator className="my-4">
                  Or continue with
                </FieldSeparator>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="hover:bg-accent"
                  >
                    <Apple className="h-5 w-5" />
                    <span className="sr-only">Login with Apple</span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="hover:bg-accent"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="hover:bg-accent"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span className="sr-only">Login with SAML</span>
                  </Button>
                </div>

              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <FieldDescription className="mt-6 text-center text-xs">
          By clicking continue, you agree to our{' '}
          <a href="#" className="underline hover:text-foreground">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </FieldDescription>
      </div>
    </div>
  );
}
