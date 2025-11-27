import { useState, useEffect, useRef } from 'react';
import { hosts, activities } from './data';
import { DualSlotMachine } from './components/DualSlotMachine';
import { Button } from '@/components/ui/button';
import { WashingMachineIcon, WashingMachineIconHandle } from '@/components/ui/washing-machine';
import { CornerDownRightIcon, CornerDownRightIconHandle } from '@/components/ui/corner-down-right';
import { LoaderPinwheelIcon, LoaderPinwheelIconHandle } from '@/components/ui/loader-pinwheel';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

function App() {
    const [isWhySheetOpen, setIsWhySheetOpen] = useState(false);
    const washingMachineRef = useRef<WashingMachineIconHandle>(null);
    const cornerDownRightRef = useRef<CornerDownRightIconHandle>(null);
    const loaderPinwheelRef = useRef<LoaderPinwheelIconHandle>(null);

    const washingMachineDesktopRef = useRef<WashingMachineIconHandle>(null);
    const cornerDownRightDesktopRef = useRef<CornerDownRightIconHandle>(null);
    const loaderPinwheelDesktopRef = useRef<LoaderPinwheelIconHandle>(null);

    // Animate icons on load, then stop
    useEffect(() => {
        // Start animations
        washingMachineRef.current?.startAnimation();
        cornerDownRightRef.current?.startAnimation();
        loaderPinwheelRef.current?.startAnimation();

        washingMachineDesktopRef.current?.startAnimation();
        cornerDownRightDesktopRef.current?.startAnimation();
        loaderPinwheelDesktopRef.current?.startAnimation();

        // Stop animations after 2 seconds
        const timer = setTimeout(() => {
            washingMachineRef.current?.stopAnimation();
            cornerDownRightRef.current?.stopAnimation();
            loaderPinwheelRef.current?.stopAnimation();

            washingMachineDesktopRef.current?.stopAnimation();
            cornerDownRightDesktopRef.current?.stopAnimation();
            loaderPinwheelDesktopRef.current?.stopAnimation();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-8">
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
                                This little site was made with love (and your usual, slightly obsessive design traits) by Ana De Magalhães. </p>
                            <p>
                                Our goal with these activities is to keep design, product thinking, and creativity alive in our team. They’re short, low-lift moments of togetherness that invite everyone to think like designers, educators, and storytellers (because we all are!)
                            </p>
                            <p>
                                We make space to zoom out, celebrate small details, and remind ourselves why great experiences matter. Every session is meant to spark curiosity and deepen our shared understanding of the crafts that connect us.
                            </p>
                            <p>
                                To keep things fresh and inclusive, these sessions use rotating hosts. Each week or every other week, a different teammate takes the lead in facilitating the session. Hosting doesn’t require preparation beyond choosing a topic or prompt, and it’s a great way for everyone to bring their perspective to the table.
                            </p>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

export default App;
