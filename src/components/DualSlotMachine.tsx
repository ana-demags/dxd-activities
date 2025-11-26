import React, { useRef, useState } from 'react';
import { WheelItem } from '../data';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { CircleHelpIcon, CircleHelpIconHandle } from '@/components/ui/circle-help';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

interface DualSlotMachineProps {
    hosts: WheelItem[];
    activities: WheelItem[];
}

export const DualSlotMachine: React.FC<DualSlotMachineProps> = ({ hosts, activities }) => {
    const hostStripRef = useRef<HTMLDivElement>(null);
    const activityStripRef = useRef<HTMLDivElement>(null);
    const circleHelpRef = useRef<CircleHelpIconHandle>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<WheelItem | null>(null);
    const [selectedHost, setSelectedHost] = useState<WheelItem | null>(null);
    const itemHeight = 72;
    const repeatCount = 20;

    // Render items multiple times for seamless scrolling
    const hostDisplayItems = Array(repeatCount).fill(hosts).flat();
    const activityDisplayItems = Array(repeatCount).fill(activities).flat();

    const spin = () => {
        if (isSpinning || !hostStripRef.current || !activityStripRef.current) return;
        setIsSpinning(true);

        // Randomly select winners
        const hostWinnerIndex = Math.floor(Math.random() * hosts.length);
        const activityWinnerIndex = Math.floor(Math.random() * activities.length);

        const selectedHostWinner = hosts[hostWinnerIndex];
        const selectedActivityWinner = activities[activityWinnerIndex];

        // Calculate scroll distances
        const targetRepetition = 15;
        const hostTargetIndex = (targetRepetition * hosts.length) + hostWinnerIndex;
        const activityTargetIndex = (targetRepetition * activities.length) + activityWinnerIndex;
        const hostScrollDistance = hostTargetIndex * itemHeight;
        const activityScrollDistance = activityTargetIndex * itemHeight;

        // Apply spin animations to both
        hostStripRef.current.style.transition = 'transform 3s cubic-bezier(0.1, 0.9, 0.2, 1)';
        hostStripRef.current.style.transform = `translateY(-${hostScrollDistance}px)`;

        activityStripRef.current.style.transition = 'transform 3s cubic-bezier(0.1, 0.9, 0.2, 1)';
        activityStripRef.current.style.transform = `translateY(-${activityScrollDistance}px)`;

        setTimeout(() => {
            setIsSpinning(false);
            setSelectedActivity(selectedActivityWinner);
            setSelectedHost(selectedHostWinner);
            setSheetOpen(true);

            // Reset both strips silently
            if (hostStripRef.current) {
                hostStripRef.current.style.transition = 'none';
                const resetDistance = hostWinnerIndex * itemHeight;
                hostStripRef.current.style.transform = `translateY(-${resetDistance}px)`;
                hostStripRef.current.offsetHeight; // Force reflow
            }

            if (activityStripRef.current) {
                activityStripRef.current.style.transition = 'none';
                const resetDistance = activityWinnerIndex * itemHeight;
                activityStripRef.current.style.transform = `translateY(-${resetDistance}px)`;
                activityStripRef.current.offsetHeight; // Force reflow
            }
        }, 3000);
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Host Slot */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-normal font-display text-foreground">Host</h3>
                    <div className="relative w-full h-[72px] bg-background rounded-md overflow-hidden border-[1px] border-dashed border-border/20">
                        <div ref={hostStripRef} className="w-full text-center">
                            {hostDisplayItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="h-[72px] flex items-center justify-center text-sm text-foreground leading-none font-light truncate w-full px-4"
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" />
                    </div>
                </div>

                {/* Activity Slot */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-normal font-display text-foreground">Activity</h3>
                    <div className="relative w-full h-[72px] bg-background rounded-md overflow-hidden border-[1px] border-dashed border-border/20">
                        <div ref={activityStripRef} className="w-full text-center">
                            {activityDisplayItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="h-[72px] flex items-center justify-center text-sm text-foreground leading-none font-light truncate w-full px-4"
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" />
                    </div>
                </div>
            </div>

            <Button
                onClick={spin}
                disabled={isSpinning}
                className="w-full bg-foreground hover:bg-foreground/90 text-background text-sm font-medium tracking-[-0.5px] h-[72px] font-sans"
                size="lg"
            >
                {isSpinning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSpinning ? 'Fortune telling...' : 'Spin right round'}
            </Button>

            {selectedActivity && (
                <Button
                    variant="ghost"
                    onClick={() => setSheetOpen(true)}
                    onMouseEnter={() => circleHelpRef.current?.startAnimation()}
                    onMouseLeave={() => circleHelpRef.current?.stopAnimation()}
                    className="w-full text-foreground hover:text-foreground hover:bg-foreground/10 text-sm font-medium tracking-[-0.5px] h-[72px] font-sans mt-2"
                >
                    <CircleHelpIcon ref={circleHelpRef} className="mr-2" size={20} />
                    Activity instructions
                </Button>
            )}

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="bg-background border-border/20 sm:max-w-[500px]">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-display text-foreground mb-1 font-normal">
                            {selectedActivity?.label || 'Activity Details'}
                        </SheetTitle>
                    </SheetHeader>

                    <div className="mt-8 space-y-6">
                        {selectedActivity?.pillar && (
                            <div>
                                <h3 className="text-lg font-normal font-display text-foreground mb-1">Pillar(s)</h3>
                                <p className="text-sm text-foreground/80 leading-[150%] font-ligh tracking-tighter">
                                    {selectedActivity.pillar}
                                </p>
                            </div>
                        )}

                        {selectedActivity?.purpose && (
                            <div>
                                <h3 className="text-lg font-normal font-display text-foreground mb-1">Purpose</h3>
                                <p className="text-sm text-foreground/80 leading-[150%] font-light tracking-tighter">
                                    {selectedActivity.purpose}
                                </p>
                            </div>
                        )}

                        {selectedHost && (
                            <div>
                                <h3 className="text-lg font-normal font-display text-foreground mb-1">Host</h3>
                                <p className="text-sm text-foreground/80 leading-[150%] font-light tracking-tighter">
                                    {selectedHost.label}
                                </p>
                            </div>
                        )}
                        {selectedActivity?.hostRole && (
                            <div>
                                <h3 className="text-lg font-normal font-display text-foreground mb-1">Host's role</h3>
                                <p className="text-sm text-foreground/80 leading-[150%] font-light tracking-tighter">
                                    {selectedActivity.hostRole}
                                </p>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
