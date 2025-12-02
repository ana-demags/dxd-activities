import React, { useRef, useState } from 'react';
import { WheelItem } from '../data';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { CircleHelpIcon, CircleHelpIconHandle } from '@/components/ui/circle-help';
import { ArrowDownIcon, ArrowDownIconHandle } from '@/components/ui/arrow-down';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DualSlotMachineProps {
    hosts: WheelItem[];
    activities: WheelItem[];
}

export const DualSlotMachine: React.FC<DualSlotMachineProps> = ({ hosts, activities }) => {
    const hostStripRef = useRef<HTMLDivElement>(null);
    const activityStripRef = useRef<HTMLDivElement>(null);
    const circleHelpRef = useRef<CircleHelpIconHandle>(null);
    const arrowDownRef = useRef<ArrowDownIconHandle>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<WheelItem | null>(null);
    const [selectedHost, setSelectedHost] = useState<WheelItem | null>(null);
    const recentHostsRef = useRef<string[]>([]);
    const recentActivitiesRef = useRef<string[]>([]);
    const itemHeight = 88;
    const repeatCount = 20;

    // Render items multiple times for seamless scrolling
    const hostDisplayItems = Array(repeatCount).fill(hosts).flat();
    const activityDisplayItems = Array(repeatCount).fill(activities).flat();

    // Weighted random selection that avoids recent picks
    const weightedRandomSelection = (items: WheelItem[], recentItems: string[], maxRecent = 3) => {
        // Create weighted array - recent items get lower weight
        const weights = items.map(item => {
            const recentIndex = recentItems.indexOf(item.label);
            if (recentIndex === -1) return 1; // Not recently selected
            // Reduce weight based on how recently it was selected (most recent = lowest weight)
            return Math.max(0.1, 1 - (maxRecent - recentIndex) * 0.3);
        });

        // Calculate total weight
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

        // Pick random value
        let random = Math.random() * totalWeight;

        // Find the selected item
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return i;
            }
        }

        return items.length - 1; // Fallback
    };

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        // Use weighted random selection to avoid recent picks
        const hostWinnerIndex = weightedRandomSelection(hosts, recentHostsRef.current);
        const activityWinnerIndex = weightedRandomSelection(activities, recentActivitiesRef.current);

        const selectedHostWinner = hosts[hostWinnerIndex];
        const selectedActivityWinner = activities[activityWinnerIndex];

        // Update recent selections history
        recentHostsRef.current = [selectedHostWinner.label, ...recentHostsRef.current].slice(0, 3);
        recentActivitiesRef.current = [selectedActivityWinner.label, ...recentActivitiesRef.current].slice(0, 3);

        // Set selections immediately so refs can be created
        setSelectedActivity(selectedActivityWinner);
        setSelectedHost(selectedHostWinner);

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Instant result for reduced motion
            setTimeout(() => {
                setIsSpinning(false);
                setSheetOpen(true);

                // Position strips instantly
                if (hostStripRef.current) {
                    hostStripRef.current.style.transition = 'none';
                    const resetDistance = hostWinnerIndex * itemHeight;
                    hostStripRef.current.style.transform = `translateY(-${resetDistance}px)`;
                }

                if (activityStripRef.current) {
                    activityStripRef.current.style.transition = 'none';
                    const resetDistance = activityWinnerIndex * itemHeight;
                    activityStripRef.current.style.transform = `translateY(-${resetDistance}px)`;
                }
            }, 500); // Short delay for UX
            return;
        }

        // Wait for next frame so refs are available
        requestAnimationFrame(() => {
            if (!hostStripRef.current || !activityStripRef.current) return;

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
        });
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Host Slot */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-normal font-display text-foreground">Host</h3>
                    <div className="relative w-full h-[88px] bg-background rounded-md overflow-hidden border-[1px] border-dashed border-border/20">
                        {!selectedHost ? (
                            <div className="w-full h-[88px] flex items-center justify-center text-sm text-foreground/40 font-light tracking-tighter">
                                Reveal host
                            </div>
                        ) : (
                            <>
                                <div ref={hostStripRef} className="w-full text-center">
                                    {hostDisplayItems.map((item, i) => (
                                        <div
                                            key={i}
                                            className="h-[88px] flex items-center justify-center text-sm text-foreground leading-none font-light truncate w-full px-4 tracking-tighter"
                                        >
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" />
                            </>
                        )}
                    </div>
                </div>

                {/* Activity Slot */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-normal font-display text-foreground">Activity</h3>
                    <div className="relative w-full h-[88px] bg-background rounded-md overflow-hidden border-[1px] border-dashed border-border/20">
                        {!selectedActivity ? (
                            <div className="w-full h-[88px] flex items-center justify-center text-sm text-foreground/40 font-light tracking-tighter">
                                Reveal activity
                            </div>
                        ) : (
                            <>
                                <div ref={activityStripRef} className="w-full text-center">
                                    {activityDisplayItems.map((item, i) => (
                                        <div
                                            key={i}
                                            className="h-[88px] flex items-center justify-center text-sm text-foreground leading-none font-light truncate w-full px-4 tracking-tighter"
                                        >
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Button
                onClick={spin}
                disabled={isSpinning}
                className="w-full bg-foreground hover:bg-foreground/90 text-background text-sm tracking-[-0.5px] h-[88px] font-sans"
                size="lg"
            >
                {isSpinning && <Loader2 className="mr-2 h-4 w-4 animate-spin tracking-tighter" />}
                {isSpinning ? 'Fortune telling...' : 'Spin right round'}
            </Button>

            {selectedActivity && !isSpinning && (
                <div className="mt-4 w-full flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setSheetOpen(true)}
                        onMouseEnter={() => circleHelpRef.current?.startAnimation()}
                        onMouseLeave={() => circleHelpRef.current?.stopAnimation()}
                        className="flex-1 text-foreground/80 hover:text-foreground hover:bg-foreground/5 text-sm tracking-[-0.5px] h-[88px] font-sans border-border/20"
                    >
                        Activity details
                        <CircleHelpIcon ref={circleHelpRef} className="ml-3" size={20} />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            const section = document.getElementById('design-exercises');
                            section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        onMouseEnter={() => arrowDownRef.current?.startAnimation()}
                        onMouseLeave={() => arrowDownRef.current?.stopAnimation()}
                        className="flex-1 text-foreground/80 hover:text-foreground hover:bg-foreground/5 text-sm tracking-[-0.5px] h-[88px] font-sans border-border/20"
                    >
                        View all activities
                        <ArrowDownIcon ref={arrowDownRef} className="ml-3" size={20} />
                    </Button>
                </div>
            )}

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="bg-background border-border/20 sm:max-w-[500px]">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-display text-foreground mb-1 font-normal">
                            {selectedActivity?.label || 'Activity Details'}
                        </SheetTitle>
                    </SheetHeader>

                    <div className="mt-8 space-y-6">
                        {selectedHost && (
                            <div>
                                <h3 className="text-lg font-normal font-display text-foreground mb-1">Host</h3>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs bg-foreground/10 text-foreground">
                                            {selectedHost.label.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm text-foreground/80 leading-[150%] font-light tracking-tighter">
                                        {selectedHost.label}
                                    </p>
                                </div>
                            </div>
                        )}

                        {selectedActivity?.pillar && (
                            <div>
                                <h3 className="text-lg font-normal font-display text-foreground mb-1">Pillar(s)</h3>
                                <p className="text-sm text-foreground/80 leading-[150%] font-light tracking-tighter">
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
