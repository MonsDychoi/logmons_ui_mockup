'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // UI 템플릿이므로 인증 로직 없이 바로 대시보드로 이동
    router.push('/dashboard/overview');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='mb-4 flex justify-center'>
            <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary'>
              <span className='text-2xl font-bold text-primary-foreground'>
                L
              </span>
            </div>
          </div>
          <CardTitle className='text-center text-2xl font-bold'>
            Create an account
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                type='text'
                placeholder='John Doe'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='john@example.com'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                id='confirm-password'
                type='password'
                placeholder='••••••••'
                required
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <Button type='submit' className='w-full'>
              Create Account
            </Button>
            <div className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link
                href='/auth/sign-in'
                className='font-medium text-primary hover:underline'
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
