import { Card, CardContent } from '@/components/ui/base/card';
import { Badge } from '@/components/ui/base/badge';
import { Database, Flame } from 'lucide-react';
import { Progress } from '@radix-ui/react-progress';

// dummy user data for streak card

const user = {
  name: 'John Doe',
  streak: 3,
};

export function StreakCard() {
  return (
    <Card className="rounded-md text-xs shadow-sm">
      <CardContent className="flex items-start gap-2.5 p-2.5">
        <div className="grid flex-1 gap-1">
          <p className="font-medium">Streak</p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-100 relative overflow-hidden">
          <p className="text-black absolute z-10 text-bold text-3xl">{user.streak}</p>
          <Flame
            className="absolute w-full h-full text-orange-600 scale-125 translate-y-2 "
            fill="#ea580c"
          />
        </div>
      </CardContent>
    </Card>
  );
}
