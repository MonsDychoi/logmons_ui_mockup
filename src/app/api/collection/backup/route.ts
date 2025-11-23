import { NextResponse } from 'next/server';
import { generateBackupJSON } from '@/lib/collection/backup';

/**
 * GET /api/collection/backup
 * 현재 수집관리 데이터를 JSON으로 다운로드
 */
export async function GET() {
  try {
    const backup = await generateBackupJSON();

    // JSON 파일로 다운로드
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `collection-backup-${timestamp}.json`;

    return new NextResponse(JSON.stringify(backup, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
