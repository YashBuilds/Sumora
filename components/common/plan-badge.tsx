import { getUserDataForActiveUser } from '@/lib/user';
import { getPlanNameFromPriceId, hasActiveSubscription } from '@/lib/payments';
import { currentUser } from '@clerk/nextjs/server';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanBadgeProps {
  className?: string;
}

export default async function PlanBadge({ className }: PlanBadgeProps) {
  const user = await currentUser();
  
  if (!user?.id) return null;
  
  const email = user?.emailAddresses?.[0]?.emailAddress;
  
  console.log('🔍 PlanBadge Debug - Email:', email); // DEBUG
  
  let priceId: string | null = null;
  let userStatus: string | null = null;
  
  if (email) {
    const userData = await getUserDataForActiveUser(email);
    priceId = userData?.price_id || null;
    userStatus = userData?.status || null;
    
    console.log('🔍 PlanBadge Debug - UserData:', { priceId, userStatus, userData }); // DEBUG
  }
  
  // Use the helper function from payments.ts
  const planName = getPlanNameFromPriceId(priceId);
  const isActive = hasActiveSubscription(userStatus, priceId);
  
  console.log('🔍 PlanBadge Debug - Final:', { planName, isActive }); // DEBUG
  
  return (
    <Badge
      variant='outline'
      className={cn(
        'ml-2 bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300 flex flex-row items-center',
        !isActive && 'from-red-100 to-red-200 border-red-300',
        className
      )}
    >
      <Crown
        className={cn(
          'w-3 h-3 mr-1 text-amber-600',
          !isActive && 'text-red-600'
        )}
      />
      {isActive ? planName : 'Buy a plan'}
    </Badge>
  );
}