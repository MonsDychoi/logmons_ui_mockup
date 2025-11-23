import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Test basic connection - this will work without authentication
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // Get environment info
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    return NextResponse.json({
      success: true,
      message: 'Supabase client initialized successfully',
      connection: {
        url: supabaseUrl,
        hasAnonKey,
        isAuthenticated: !!session,
        sessionError: sessionError?.message || null
      },
      note: 'No user is currently authenticated, which is expected for a fresh setup'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to initialize Supabase client',
      error: error.message
    }, { status: 500 });
  }
}
