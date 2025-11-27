import { useState, useEffect, useRef } from 'react';
import { hosts, activities } from './data';
import { DualSlotMachine } from './components/DualSlotMachine';
import { Button } from '@/components/ui/button';
import { WashingMachineIcon, WashingMachineIconHandle } from '@/components/ui/washing-machine';
import { CornerDownRightIcon, CornerDownRightIconHandle } from '@/components/ui/corner-down-right';
import { LoaderPinwheelIcon, LoaderPinwheelIconHandle } from '@/components/ui/loader-pinwheel';
import { FolderOpen } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

function App() {
    const [isWhySheetOpen, setIsWhySheetOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<string>(activities[0].label);
    const washingMachineRef = useRef<WashingMachineIconHandle>(null);
    const cornerDownRightRef = useRef<CornerDownRightIconHandle>(null);
    const loaderPinwheelRef = useRef<LoaderPinwheelIconHandle>(null);

    const washingMachineDesktopRef = useRef<WashingMachineIconHandle>(null);
    const cornerDownRightDesktopRef = useRef<CornerDownRightIconHandle>(null);
    const loaderPinwheelDesktopRef = useRef<LoaderPinwheelIconHandle>(null);

    // Animate icons on load with staggered timing to match text animations
    useEffect(() => {
        // Mobile icons - all start together since they appear above text
        washingMachineRef.current?.startAnimation();
        cornerDownRightRef.current?.startAnimation();
        loaderPinwheelRef.current?.startAnimation();

        // Desktop icons - stagger to match typewriter timing
        // "Spin" completes at ~400ms
        const washingTimer = setTimeout(() => {
            washingMachineDesktopRef.current?.startAnimation();
        }, 400);

        // "That" starts at ~450ms - arrow appears before the word
        const cornerTimer = setTimeout(() => {
            cornerDownRightDesktopRef.current?.startAnimation();
        }, 450);

        // "Wheel" completes at ~1200ms (800ms start + 400ms duration)
        const pinwheelTimer = setTimeout(() => {
            loaderPinwheelDesktopRef.current?.startAnimation();
        }, 1200);

        // Stop all animations after ALL complete
        // Pinwheel starts at 1200ms + 1000ms animation duration = finishes at 2200ms
        // Add small buffer for clean finish
        const stopTimer = setTimeout(() => {
            washingMachineRef.current?.stopAnimation();
            cornerDownRightRef.current?.stopAnimation();
            loaderPinwheelRef.current?.stopAnimation();

            washingMachineDesktopRef.current?.stopAnimation();
            cornerDownRightDesktopRef.current?.stopAnimation();
            loaderPinwheelDesktopRef.current?.stopAnimation();
        }, 2300);

        return () => {
            clearTimeout(washingTimer);
            clearTimeout(cornerTimer);
            clearTimeout(pinwheelTimer);
            clearTimeout(stopTimer);
        };
    }, []);

    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center px-8 py-20">
            <div className="w-full mx-auto" style={{ maxWidth: '1184px' }}>
                {/* 2-column layout on large screens, stacked on smaller screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[56px] items-center">
                    {/* Left column: Heading and description */}
                    <div className="text-center lg:text-left w-full">
                        {/* Mobile: Icons row above text */}
                        <div className="flex items-center justify-center gap-3 mb-6 lg:hidden">
                            <WashingMachineIcon
                                ref={washingMachineRef}
                                className="text-icon-washing-machine w-[72px] h-[72px] md:w-[100px] md:h-[100px] [&_svg]:w-full [&_svg]:h-full"
                            />
                            <CornerDownRightIcon
                                ref={cornerDownRightRef}
                                className="text-icon-corner-down-right w-[72px] h-[72px] md:w-[100px] md:h-[100px] [&_svg]:w-full [&_svg]:h-full"
                            />
                            <LoaderPinwheelIcon
                                ref={loaderPinwheelRef}
                                className="text-icon-loader-pinwheel w-[72px] h-[72px] md:w-[100px] md:h-[100px] [&_svg]:w-full [&_svg]:h-full"
                            />
                        </div>

                        <h1 className="text-[104px] md:text-[136px] tracking-tighter font-display font-bold text-foreground mb-6 cursor-default flex flex-col gap-0 items-center lg:items-start">
                            <span className="inline-flex items-center gap-6 leading-none">
                                <span className="inline-block overflow-hidden whitespace-nowrap w-0 animate-typewriter-1">Spin</span>
                                <WashingMachineIcon
                                    ref={washingMachineDesktopRef}
                                    size={100}
                                    className="text-icon-washing-machine hidden lg:block"
                                />
                            </span>
                            <span className="inline-flex items-center gap-6 leading-none">
                                <CornerDownRightIcon
                                    ref={cornerDownRightDesktopRef}
                                    size={100}
                                    className="text-icon-corner-down-right hidden lg:block"
                                />
                                <span className="inline-block overflow-hidden whitespace-nowrap w-0 animate-typewriter-2">That</span>
                            </span>
                            <span className="inline-flex items-center gap-6 leading-none">
                                <span className="inline-block overflow-hidden whitespace-nowrap w-0 animate-typewriter-3">Wheel</span>
                                <LoaderPinwheelIcon
                                    ref={loaderPinwheelDesktopRef}
                                    size={100}
                                    className="text-icon-loader-pinwheel hidden lg:block"
                                />
                            </span>
                        </h1>
                        <p className="text-foreground/80 text-sm leading-[150%] tracking-tighter font-light max-w-[520px] mx-auto lg:mx-0 opacity-0 animate-fade-in">
                            Welcome to the DX Design team's take on <s>Wheel</s> Input of Fortune. Every week, we spin to reveal a host and a 30-minute activity meant to sharpen our brains and design skills.{' '}
                            (<Button
                                variant="link"
                                className="text-foreground/80 p-0 h-auto font-medium underline decoration-wavy underline-offset-4 hover:decoration-solid"
                                onClick={() => setIsWhySheetOpen(true)}
                            >
                                Why, you ask?
                            </Button>)
                        </p>
                    </div>

                    {/* Right column: Slot machine and button */}
                    <div className="w-full opacity-0 animate-fade-in">
                        <DualSlotMachine hosts={hosts} activities={activities} />
                    </div>
                </div>

                <Sheet open={isWhySheetOpen} onOpenChange={setIsWhySheetOpen}>
                    <SheetContent className="bg-background border-border/20 overflow-y-auto sm:max-w-[500px]">
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-display text-foreground mb-6 font-normal">
                                What's this thing about?
                            </SheetTitle>
                        </SheetHeader>
                        <div className="space-y-6 text-foreground/80 text-sm leading-[150%] tracking-tighter font-light">
                            <p>
                                This little site was made with love (and the usual, slightly obsessive designer traits) by Ana De Magalhães. </p>
                            <p>
                                Our goal with these activities is to keep design, product thinking, and creativity alive in our team. They're short, low-lift moments of togetherness that invite everyone to think like designers, educators, and storytellers (because we all are!)
                            </p>
                            <p>
                                We make space to zoom out, celebrate small details, and remind ourselves why great experiences matter. Every session is meant to spark curiosity and deepen our shared understanding of the crafts that connect us.
                            </p>
                            <p>
                                To keep things fresh and inclusive, these sessions use rotating hosts. Each week or every other week, a different teammate takes the lead in facilitating the session. Hosting doesn't require preparation beyond choosing a topic or prompt, and it's a great way for everyone to bring their perspective to the table.
                            </p>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Design Exercises Section */}
                <section id="design-exercises" className="w-full" style={{ marginTop: '304px' }}>
                    <h2 className="font-display font-bold text-foreground mb-14 lg:mb-20 text-center lg:text-left tracking-tight leading-[100%]" style={{ fontSize: '88px' }}>
                        Design exercises
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-20">
                        {/* Navigation List */}
                        <div className="lg:sticky lg:top-8 lg:self-start">
                            <h3 className="text-lg font-display text-foreground mb-4 flex items-center gap-3">
                                <FolderOpen size={18} className="text-foreground/80" />
                                All activities
                            </h3>
                            <nav className="border-l border-foreground/20 pl-4 space-y-1">
                                {activities.map((activity) => (
                                    <button
                                        key={activity.label}
                                        onClick={() => setSelectedActivity(activity.label)}
                                        className={cn(
                                            "w-full text-left px-4 py-3 rounded-md text-sm font-light tracking-tighter transition-colors",
                                            selectedActivity === activity.label
                                                ? "bg-foreground/5 text-foreground"
                                                : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                                        )}
                                    >
                                        {activity.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Activity Details Content */}
                        <div className="min-h-[400px]">
                            {(() => {
                                const activity = activities.find(a => a.label === selectedActivity);
                                if (!activity) return null;

                                return (
                                    <div className="space-y-8">
                                        <h4 className="font-display font-bold text-foreground mb-6 tracking-tight leading-[100%]" style={{ fontSize: '56px' }}>
                                            {activity.label}
                                        </h4>

                                        {activity.pillar && (
                                            <div className="mb-4">
                                                <h4 className="text-lg font-normal font-display text-foreground mb-1">Pillar(s)</h4>
                                                <p className="text-sm text-foreground/80 leading-[150%] font-light tracking-tighter">
                                                    {activity.pillar}
                                                </p>
                                            </div>
                                        )}

                                        {activity.purpose && (
                                            <div className="mb-4">
                                                <h4 className="text-lg font-normal font-display text-foreground mb-1">Purpose</h4>
                                                <p className="text-sm text-foreground/80 leading-[150%] font-light tracking-tighter">
                                                    {activity.purpose}
                                                </p>
                                            </div>
                                        )}

                                        {activity.hostRole && (
                                            <div className="mb-4">
                                                <h4 className="text-lg font-normal font-display text-foreground mb-1">Host's role</h4>
                                                <p className="text-sm text-foreground/80 leading-[150%] font-light tracking-tighter">
                                                    {activity.hostRole}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;
