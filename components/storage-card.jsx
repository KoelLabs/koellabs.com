import { Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from './ui/badge';

export function StorageCard() {
  return (
    <Card className="rounded-md text-xs shadow-sm min-w-[233px]">
      <CardContent className="flex flex-col items-start gap-2 p-4">
        <div className="flex items-center tracking-tight w-full">
          <h3 className="font-semibold text-sm">Welcome to the Beta!</h3>
          <Badge variant="outline" className="ml-auto">
            New
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Please let us know if you have any feedback, questions, or issues.
        </p>
      </CardContent>
    </Card>
  );
}
