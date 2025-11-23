'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

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
    <div className={cn('flex min-h-screen items-center justify-center p-6 bg-muted/30', className)} {...props}>
      <div className="w-full max-w-4xl">
        <Card className="border-border/50 shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* 왼쪽: 로그인 폼 */}
            <CardContent className="p-8 lg:w-1/2">
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  {/* 타이틀 */}
                  <div className="flex flex-col items-center gap-2 text-center mb-6">
                    <h2 className="text-2xl font-semibold">Welcome back</h2>
                    <p className="text-muted-foreground text-sm">
                      로그인하고 Log Mons를 시작하세요
                    </p>
                  </div>

                {/* ID 입력 */}
                <Field>
                  <FieldLabel htmlFor="userId">ID</FieldLabel>
                  <Input
                    id="userId"
                    type="text"
                    placeholder="Enter your ID"
                    required
                  />
                </Field>

                {/* 비밀번호 입력 */}
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="text-sm hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </Field>

                {/* 로그인 버튼 */}
                <Field>
                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-black/90 text-white font-medium h-11"
                  >
                    Login
                  </Button>
                </Field>

                {/* 구분선 */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* OAuth 및 SAML 로그인 버튼 */}
                <div className="grid grid-cols-5 gap-3">
                  {/* Google 로그인 */}
                  <Button
                    variant="outline"
                    type="button"
                    className="hover:bg-accent"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Google 로그인</span>
                  </Button>

                  {/* Apple 로그인 */}
                  <Button
                    variant="outline"
                    type="button"
                    className="hover:bg-accent"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="sr-only">Apple 로그인</span>
                  </Button>

                  {/* Naver 로그인 */}
                  <Button
                    variant="outline"
                    type="button"
                    className="hover:bg-accent"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" fill="#03C75A"/>
                    </svg>
                    <span className="sr-only">Naver 로그인</span>
                  </Button>

                  {/* Kakao 로그인 */}
                  <Button
                    variant="outline"
                    type="button"
                    className="hover:bg-accent"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C6.486 3 2 6.262 2 10.289c0 2.57 1.671 4.839 4.169 6.207l-.997 3.653c-.054.196.145.362.318.267l4.282-2.818c.316.028.636.042.958.042 5.514 0 9.97-3.262 9.97-7.289C20.7 6.262 17.514 3 12 3z" fill="#FEE500"/>
                    </svg>
                    <span className="sr-only">Kakao 로그인</span>
                  </Button>

                  {/* SAML 로그인 */}
                  <Button
                    variant="outline"
                    type="button"
                    className="hover:bg-accent"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    <span className="sr-only">SAML 로그인</span>
                  </Button>
                </div>

                </FieldGroup>
              </form>

              {/* 개인정보 보호정책 */}
              <FieldDescription className="mt-6 text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{' '}
                <a href="#" className="underline hover:text-foreground" onClick={(e) => e.preventDefault()}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline hover:text-foreground" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
                .
              </FieldDescription>
            </CardContent>

            {/* 오른쪽: 이미지/로고 영역 */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-muted/30">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted">
                <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
