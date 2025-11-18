import { IconShield } from '@tabler/icons-react';

export default function SecurityPage() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Security</h1>
          <p className='text-muted-foreground'>
            Monitor security events and manage access control
          </p>
        </div>
      </div>

      <div className='flex h-[400px] items-center justify-center rounded-lg border border-dashed'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <IconShield className='h-16 w-16 text-muted-foreground' />
          <div>
            <h3 className='text-xl font-semibold'>Coming Soon</h3>
            <p className='text-sm text-muted-foreground'>
              Security monitoring features will be available here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
