import { Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/base/button';
import { Card, CardContent, CardFooter } from '@/components/ui/base/card';
import { Badge } from '@/components/ui/base/badge';
// import @radix-ui/react-slider
import * as SliderPrimitive from '@radix-ui/react-slider';

export function BetaCard() {
  return (
    <Card className="rounded-md text-xs shadow-xs min-w-[233px] relative -mb-1">
      <CardContent className="flex flex-col items-start gap-2 p-4 relative">
        <div className="flex items-center tracking-tight w-full relative">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 1 100"
            className="absolute top-0 left-0 rounded-md w-full h-full"
          >
            <g filter="url(#filter0_f_2239_260)">
              <circle cx="30" cy="30" r="44" fill="#317EC5"></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_2239_260"
                width="200"
                height="200"
                x="-0"
                y="-0"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_2239_260"
                  stdDeviation="44.9"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg> */}
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
